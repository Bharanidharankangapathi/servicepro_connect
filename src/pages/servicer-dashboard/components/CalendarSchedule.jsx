import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarSchedule = ({ appointments, onUpdateAvailability, onViewAppointment }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek?.setDate(date?.getDate() - date?.getDay());
    
    for (let i = 0; i < 7; i++) {
      let day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      week?.push(day);
    }
    return week;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date?.toDateString();
    return appointments?.filter(apt => new Date(apt.date)?.toDateString() === dateStr);
  };

  const hasConflict = (date) => {
    const dayAppointments = getAppointmentsForDate(date);
    return dayAppointments?.some(apt => apt?.status === 'conflict');
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days?.push(<div key={`empty-${i}`} className="h-24 border border-border"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const isToday = date?.toDateString() === new Date()?.toDateString();
      const isSelected = date?.toDateString() === selectedDate?.toDateString();
      const hasConflictToday = hasConflict(date);

      days?.push(
        <div
          key={day}
          className={`h-24 border border-border p-1 cursor-pointer hover:bg-muted transition-colors ${
            isToday ? 'bg-primary/10' : ''
          } ${isSelected ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-text-primary'}`}>
              {day}
            </span>
            {hasConflictToday && (
              <Icon name="AlertTriangle" size={12} className="text-error" />
            )}
          </div>
          <div className="space-y-1">
            {dayAppointments?.slice(0, 2)?.map((apt, index) => (
              <div
                key={index}
                className={`text-xs px-1 py-0.5 rounded truncate ${
                  apt?.status === 'confirmed' ? 'bg-success text-white' :
                  apt?.status === 'pending'? 'bg-warning text-white' : 'bg-error text-white'
                }`}
                title={`${apt?.time} - ${apt?.clientName}`}
              >
                {apt?.time}
              </div>
            ))}
            {dayAppointments?.length > 2 && (
              <div className="text-xs text-text-secondary">+{dayAppointments?.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="h-10 border border-border bg-muted flex items-center justify-center">
            <span className="text-sm font-medium text-text-primary">{day}</span>
          </div>
        ))}
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate);
    
    return (
      <div className="space-y-4">
        {/* Week Header */}
        <div className="grid grid-cols-7 gap-4">
          {weekDates?.map((date, index) => {
            const isToday = date?.toDateString() === new Date()?.toDateString();
            const dayAppointments = getAppointmentsForDate(date);
            
            return (
              <div key={index} className="text-center">
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : 'text-text-primary'}`}>
                  {date?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold mb-2 ${isToday ? 'text-primary' : 'text-text-primary'}`}>
                  {date?.getDate()}
                </div>
                <div className="space-y-1">
                  {dayAppointments?.map((apt, aptIndex) => (
                    <div
                      key={aptIndex}
                      className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 ${
                        apt?.status === 'confirmed' ? 'bg-success text-white' :
                        apt?.status === 'pending'? 'bg-warning text-white' : 'bg-error text-white'
                      }`}
                      onClick={() => onViewAppointment(apt)}
                    >
                      <div className="font-medium">{apt?.time}</div>
                      <div className="truncate">{apt?.clientName}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-text-primary">Schedule</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => viewMode === 'month' ? navigateMonth(-1) : navigateWeek(-1)}
            iconName="ChevronLeft"
          />
          <span className="text-sm font-medium text-text-primary min-w-[120px] text-center">
            {currentDate?.toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => viewMode === 'month' ? navigateMonth(1) : navigateWeek(1)}
            iconName="ChevronRight"
          />
        </div>
      </div>
      {/* Calendar View */}
      {viewMode === 'month' ? renderMonthView() : renderWeekView()}
      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-6 border-t border-border pt-6">
          <h4 className="font-semibold text-text-primary mb-3">
            {formatDate(selectedDate)}
          </h4>
          <div className="space-y-3">
            {getAppointmentsForDate(selectedDate)?.length > 0 ? (
              getAppointmentsForDate(selectedDate)?.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      apt?.status === 'confirmed' ? 'bg-success' :
                      apt?.status === 'pending'? 'bg-warning' : 'bg-error'
                    }`}></div>
                    <div>
                      <p className="font-medium text-text-primary">{apt?.time}</p>
                      <p className="text-sm text-text-secondary">{apt?.clientName} - {apt?.service}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewAppointment(apt)}
                    iconName="Eye"
                  >
                    View
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-center py-4">No appointments scheduled</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSchedule;