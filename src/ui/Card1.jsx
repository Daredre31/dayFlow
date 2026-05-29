import React, { useState } from 'react'
import { useTaskContext } from '../context/Taskcontroller';
import Taskform from './Taskform';

const Card1 = ({ state = 'grid' }) => {
  const { task, deleteTask, checkedItems, handleCheck } = useTaskContext();

  const [selectedTask, setSelectedTask] = useState(null);

  const openEdit  = (item) => setSelectedTask(item);
  const closeEdit = ()     => setSelectedTask(null);

  if (state === 'list') {
    return (
      <>
        <div className='flex flex-col gap-2 p-2'>
          {task.map(item => (
            <div
              key={item._id}
              onClick={() => openEdit(item)}
              className='flex items-center gap-3 px-3 py-2 rounded-md
                         bg-surface border border-border cursor-pointer
                         hover:border-accent transition-all duration-200'
            >
              {/* Checkbox */}
              <button
                onClick={(e) => { e.stopPropagation(); handleCheck(item._id); }}
                className={`
                  w-5 h-5 flex-shrink-0 flex items-center justify-center
                  rounded border-2 transition-all duration-200
                  cursor-pointer text-xs font-semibold
                  ${checkedItems[item._id]
                    ? 'bg-green border-green text-surface2'
                    : 'border-border bg-surface3 hover:border-green'
                  }
                `}
              >
                {checkedItems[item._id] ? '✓' : ''}
              </button>

              <span className={`
                flex-1 text-sm font-medium text-text truncate
                ${checkedItems[item._id] ? 'line-through opacity-50' : ''}
              `}>
                {item.title}
              </span>

              <span className='text-xs bg-accent px-2 py-0.5 rounded text-surface2 font-medium flex-shrink-0'>
                {item.category}
              </span>
              <span className={`
                text-xs font-semibold px-2 py-0.5 rounded flex-shrink-0
                ${item.priority === 'high'
                  ? 'bg-red text-surface2'
                  : item.priority === 'medium'
                  ? 'bg-amber text-surface2'
                  : 'bg-green text-surface2'
                }
              `}>
                {item.priority}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteTask(item._id); }}
                className='text-xs px-2 py-0.5 rounded font-medium flex-shrink-0
                           bg-red text-surface2 hover:bg-red/80
                           transition-colors duration-200 active:scale-95'
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {selectedTask && (
          <Taskform editTask={selectedTask} closeForm={closeEdit} />
        )}
      </>
    );
  }

  // Grid view
  return (
    <>
      <div className='flex flex-col gap-3 w-full'>
        {task.map(item => (
          <div
            key={item._id}
            onClick={() => openEdit(item)}
            className='bg-surface2  md:w-[48%] h-auto
                       px-4 py-3 rounded-lg border border-border cursor-pointer
                       hover:border-accent transition-all duration-200
                       flex flex-col justify-between'
          >
            {/* Header */}
            <div className='flex justify-between items-center mb-3'>
              <button
                onClick={(e) => { e.stopPropagation(); handleCheck(item._id); }}
                className={`
                  w-6 h-6 flex items-center justify-center
                  rounded-md border-2 transition-all duration-200
                  cursor-pointer font-semibold text-sm
                  ${checkedItems[item._id]
                    ? 'bg-green border-green text-surface2'
                    : 'border-border bg-surface3 hover:border-green'
                  }
                `}
              >
                {checkedItems[item._id] ? '✓' : ''}
              </button>
              <span className={`
                text-xs font-semibold px-3 py-1 rounded-md
                ${item.priority === 'high'
                  ? 'bg-red text-surface2'
                  : item.priority === 'medium'
                  ? 'bg-amber text-surface2'
                  : 'bg-green text-surface2'
                }
              `}>
                {item.priority}
              </span>
            </div>

            {/* Title */}
            <div className='mb-3 flex-grow'>
              <span className={`
                text-sm font-medium text-text
                ${checkedItems[item._id] ? 'line-through opacity-60' : ''}
              `}>
                {item.title}
              </span>
            </div>

            {/* Footer */}
            <div className='flex justify-between items-center gap-2 pt-2 border-t border-border'>
              <span className='text-xs bg-accent px-3 py-1 rounded-md text-surface2 font-medium'>
                {item.category}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteTask(item._id); }}
                className='text-xs px-3 py-1 rounded-md font-medium
                           bg-red text-surface2 hover:bg-red/80
                           transition-colors duration-200 active:scale-95'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedTask && (
        <Taskform editTask={selectedTask} closeForm={closeEdit} />
      )}
    </>
  );
};

export default Card1;