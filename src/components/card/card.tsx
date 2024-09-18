import React from 'react'
import './card.css'
import {ReactComponent as PriorityNone} from '../../assets/icons_FEtask/No-priority.svg';
import {ReactComponent as PriorityLow} from '../../assets/icons_FEtask/Img - Low Priority.svg';
import {ReactComponent as PriorityHigh} from '../../assets/icons_FEtask/Img - High Priority.svg'
import {ReactComponent as PriorityMedium} from '../../assets/icons_FEtask/Img - Medium Priority.svg'
import {ReactComponent as PriorityUrgent} from '../../assets/icons_FEtask/SVG - Urgent Priority grey.svg'
import {ReactComponent as TodoIcon} from '../../assets/icons_FEtask/To-do.svg'
import {ReactComponent as InProgressIcon} from '../../assets/icons_FEtask/in-progress.svg'
import {ReactComponent as BacklogIcon} from '../../assets/icons_FEtask/Backlog.svg'
import {ReactComponent as DoneIcon} from '../../assets/icons_FEtask/Done.svg'
import {ReactComponent as CancelledIcon} from '../../assets/icons_FEtask/Cancelled.svg'
import userAvatar from '../../assets/icons_FEtask/user-avatar-default.png'

interface CardProps{
    id :string;
    title: string;
    tag: any;
    status: string;
    priority: number
}

const Card = ({id, title, tag, status, priority}: CardProps) => {
    const getPriorityIcon = (priority: number) => {
        switch(priority) {
            case 0: return <PriorityNone/>;
            case 1: return <PriorityLow/>;
            case 2: return <PriorityMedium/>;
            case 3: return <PriorityHigh/>;
            case 4: return <PriorityUrgent/>;   
            default: return null;       
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status) {
            case "Todo": return <TodoIcon/>;
            case "In progress": return <InProgressIcon/>;
            case "Backlog": return <BacklogIcon/>;
            case "Done": return <DoneIcon/>;
            case "Canceled": return <CancelledIcon/>;
            default: return null;
        }
    }

    return ( 
        <div className='cardComponent'>
            <div className='cardHead'>
                <span>{id}</span>
                <img src={userAvatar} className='userAvatar'/>
            </div>
            <div className='cardContent'>
                <div className='cardTitleRow'>
                    <div className='CardStatus'>
                        {getStatusIcon(status)}
                    </div>
                    <div className='cardTitle'>
                    <p>{title}</p>
                </div>
            </div>
            </div>
            <div className='cardFooter'>
                <div className="priority-icon">
                    {getPriorityIcon(priority)}
                </div>
                <div className='tag'>{tag}</div>
            </div>        
        </div>
     );
}
 
export default Card;