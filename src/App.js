import './App.css';
import { fetchTickets } from './api/api';
import Card from './components/card/card.tsx';
import { useEffect, useState, useMemo } from 'react';
import DisplayBar from './components/displayBar/displayBar.tsx';

import {ReactComponent as PriorityNone} from './assets/icons_FEtask/No-priority.svg';
import {ReactComponent as PriorityLow} from './assets/icons_FEtask/Img - Low Priority.svg';
import {ReactComponent as PriorityHigh} from './assets/icons_FEtask/Img - High Priority.svg'
import {ReactComponent as PriorityMedium} from './assets/icons_FEtask/Img - Medium Priority.svg'
import {ReactComponent as PriorityUrgent} from './assets/icons_FEtask/SVG - Urgent Priority colour.svg'

import {ReactComponent as TodoIcon} from './assets/icons_FEtask/To-do.svg'
import {ReactComponent as InProgressIcon} from './assets/icons_FEtask/in-progress.svg'
import {ReactComponent as BacklogIcon} from './assets/icons_FEtask/Backlog.svg'
import {ReactComponent as DoneIcon} from './assets/icons_FEtask/Done.svg'
import {ReactComponent as CancelledIcon} from './assets/icons_FEtask/Cancelled.svg'

import {ReactComponent as Add} from './assets/icons_FEtask/add.svg'
import {ReactComponent as Dot} from './assets/icons_FEtask/3 dot menu.svg'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grouping, setGrouping] = useState(() => sessionStorage.getItem("group") || "status");
  const [ordering, setOrdering] = useState(() => sessionStorage.getItem("order") || "priority");

  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await fetchTickets(); 
        setData(apiData);  
        setLoading(false);  
      } catch (err) {
        setError(err);  
        setLoading(false);  
      }
    };

    getData();
  }, []);

  const getPriorityName = (priorityValue) => {
    switch(priorityValue) {
        case 0: return "No priority";
        case 1: return "Low";
        case 2: return "Medium";
        case 3: return "High";
        case 4: return "Urgent";
        default: return "Unknown";
    }
  }

  const groupedAndOrderedData = useMemo(() => {
    if (!data) return null;

    const grouped = data.tickets.reduce((acc, ticket) => {
      let key;
      if (grouping === 'priority') {
        key = getPriorityName(ticket.priority);
      } else if (grouping === 'user'){
        const user = data.users.find(user => user.id === ticket.userId);
        key = user ? user.name : 'Unassigned';
      } 
      else {
        key = ticket[grouping];
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (ordering === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  }, [data, grouping, ordering]);

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
    sessionStorage.setItem("group", newGrouping);
  };

  const handleOrderingChange = (newOrdering) => {
    setOrdering(newOrdering);
    sessionStorage.setItem("order", newOrdering);
  };

  const getStatusIcon = (status) => {
    switch(status) {
        case "Todo": return <TodoIcon/>;
        case "In progress": return <InProgressIcon/>;
        case "Backlog": return <BacklogIcon/>;
        case "Done": return <DoneIcon/>;
        case "Canceled": return <CancelledIcon/>;
        default: return null;
    }
  }

  const getPriorityIcon = (priority) => {
    switch(priority) {
        case "No priority": return <PriorityNone/>;
        case "Low": return <PriorityLow/>;
        case "Medium": return <PriorityMedium/>;
        case "High": return <PriorityHigh/>;
        case "Urgent": return <PriorityUrgent/>;   
        default: return null;       
    }
  }

  const renderColumns = () => {
    const columnsStatus = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
    const columnsPriority = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];
    let columns;

    if(grouping === 'status'){
      columns = columnsStatus;
    } else if (grouping === 'priority'){
      columns = columnsPriority;
    } else if (grouping === 'user'){
      columns = [...new Set(data.tickets.map(ticket => {
        const user = data.users.find(user => user.id === ticket.userId);
        return user ? user.name : 'Unassigned';
      }))];
    } else {
      columns= Object.keys(groupedAndOrderedData || {});
    }

    return columns.map(column => (
      <div key={column} className='column'>
        <h4 className='columnTitle'>
          <div className='titleLeft'>
            {grouping === 'status' && getStatusIcon(column)}
            {grouping === 'priority' && getPriorityIcon(column)}
            <span>{column}</span>
            {groupedAndOrderedData && groupedAndOrderedData[column] && (
            <span className='numTickets'> {groupedAndOrderedData[column].length}</span>
            )}
          </div>
          <div className='colUtils'>
            <Add/>
            <Dot/>
          </div>
        </h4>
        <div className='ticketList'>
          {groupedAndOrderedData && groupedAndOrderedData[column] ? 
            groupedAndOrderedData[column].map(ticket => (
              <Card 
                key={ticket.id}
                id={ticket.id} 
                status={grouping !== 'status' ? ticket.status : undefined} 
                priority={grouping !== 'priority' ? ticket.priority : undefined} 
                tag={ticket.tag} 
                title={ticket.title}
              />
            )) : null}
        </div>
      </div>
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="app">
      <div className="DisplayBar">
        <DisplayBar 
          grouping={grouping} 
          ordering={ordering}
          onGroupingChange={handleGroupingChange}
          onOrderingChange={handleOrderingChange}
        />
      </div>
      <div className='page'>
        <div className={`board ${grouping !== 'status' && grouping !== 'priority' ? 'scrollable' : ''}`}>
          {renderColumns()}
        </div>
      </div>
    </div>
  );
}

export default App;