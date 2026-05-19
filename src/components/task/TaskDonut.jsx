import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTaskContext } from '../../context/Taskcontroller';


const TaskDonut = () => {
  const { task, completdCheck } = useTaskContext();

  // derive counts from real task data
  const done       = task.filter(t => t.status === 'done').length;
  const inProgress = task.filter(t => t.status === 'in-progress').length;
  const overdue    = task.filter(t => t.status === 'overdue').length;
  const total      = task.length;
//   const rate       = total > 0 ? Math.round((done / total) * 100) : 0;

     
     const [progress , setProgress] = useState(0)

     useEffect(()=> {
        if(task.length === 0){
            setProgress(0)
        } else {
             const ctPercent = (completdCheck * 100)/task.length
             setProgress(ctPercent)
        }
     } ,[task , completdCheck])

  const data = [
    { name: 'Done',        value: done,       color: '#2DD4A0' },
    { name: 'In Progress', value: inProgress,  color: '#4F7EFF' },
    { name: 'Overdue',     value: overdue,     color: '#FF5C6A' },
  ].filter(d => d.value > 0); 

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value, color } = payload[0].payload;
    return (
      <div className='bg-surface2 border border-border rounded-lg px-3 py-2 text-xs'>
        <span style={{ color }} className='font-semibold'>{name}</span>
        <span className='text-secondary ml-2'>{value} tasks</span>
      </div>
    );
  };

  return (
    <div className='flex items-center gap-6 p-4 bg-surface2 border border-border rounded-xl'>

      {/* Donut */}
      <div className='relative flex-shrink-0' style={{ width: 160, height: 160 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={data.length ? data : [{ name: 'No tasks', value: 1, color: '#2A3050' }]}
              cx='50%'
              cy='50%'
              innerRadius={55}
              outerRadius={75}
              paddingAngle={data.length > 1 ? 3 : 0}
              dataKey='value'
              strokeWidth={0}
            >
              {(data.length ? data : [{ color: '#2A3050' }]).map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre label */}
        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
          <span className='text-2xl font-semibold text-text'>{total}</span>
          <span className='text-xs text-secondary'>total</span>
        </div>
      </div>

      {/* Right panel */}
      <div className='flex flex-col gap-3 flex-1'>

        {/* Metric pills */}
        <div className='flex gap-2'>
          <div className='bg-surface3 rounded-md px-3 py-2 flex-1'>
            <div className='text-xl font-semibold text-text'>{progress}%</div>
            <div className='text-xs text-secondary'>completion</div>
          </div>
          <div className='bg-surface3 rounded-md px-3 py-2 flex-1'>
            <div className='text-xl font-semibold text-green'>{done}</div>
            <div className='text-xs text-secondary'>done</div>
          </div>
        </div>

        {/* Legend */}
        <div className='flex flex-col gap-1.5'>
          {[
            { label: 'Done',        count: done,       color: '#2DD4A0' },
            { label: 'In progress', count: inProgress,  color: '#4F7EFF' },
            { label: 'Overdue',     count: overdue,     color: '#FF5C6A' },
          ].map(({ label, count, color }) => (
            <div key={label} className='flex items-center gap-2 text-xs text-secondary'>
              <span className='w-2.5 h-2.5 rounded-sm flex-shrink-0' style={{ background: color }} />
              {label} — {count} task{count !== 1 ? 's' : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskDonut;