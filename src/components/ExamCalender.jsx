import React, { useState } from 'react';

// SVG Icons
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Calendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Filter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const X = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Save = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const ExamCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 18));
  const [startDate, setStartDate] = useState('2025-11-18');
  const [endDate, setEndDate] = useState('2025-11-24');
  
  // Filter states
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  
  const [events, setEvents] = useState([
    { id: '1', title: 'Algorithmique 1', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Algorithmique', day: 2, startTime: '08:30', endTime: '11:00', color: '#ef9a9a' },
    { id: '2', title: 'Analyse 1', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Mathématiques', day: 2, startTime: '11:00', endTime: '13:00', color: '#ef9a9a' },
    { id: '3', title: 'Algèbre 1', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Mathématiques', day: 4, startTime: '13:30', endTime: '16:00', color: '#ef9a9a' },
    { id: '4', title: 'Anglais 1', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Langues', day: 4, startTime: '16:00', endTime: '18:00', color: '#90caf9' },
    { id: '5', title: 'Langues étrangères', room: 'Salle N110', level: 'Licence 2 - Informatique', module: 'Langues', day: 6, startTime: '08:30', endTime: '11:00', color: '#ef9a9a' },
    { id: '6', title: 'Structure', room: 'Salle N110', level: 'Licence 2 - Informatique', module: 'Architecture', day: 6, startTime: '11:00', endTime: '13:00', color: '#ef9a9a' },
    { id: '7', title: 'Physique 1', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Physique', day: 7, startTime: '08:30', endTime: '11:00', color: '#dce775' },
    { id: '8', title: 'Composant ord', room: 'Salle N110', level: 'Licence 1 - Informatique', module: 'Architecture', day: 7, startTime: '11:00', endTime: '13:00', color: '#dce775' },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    room: '',
    level: '',
    module: '',
    day: 2,
    startTime: '08:30',
    endTime: '11:00',
    color: '#ef9a9a'
  });

  const colors = [
    { value: '#ef9a9a', label: 'Rouge' },
    { value: '#90caf9', label: 'Bleu' },
    { value: '#dce775', label: 'Vert' },
    { value: '#ce93d8', label: 'Violet' },
    { value: '#ffcc80', label: 'Orange' }
  ];

  const levels = ['Licence 1 - Informatique', 'Licence 2 - Informatique', 'Licence 3 - Informatique', 'Master 1 - Informatique', 'Master 2 - Informatique'];
  const modules = ['Algorithmique', 'Mathématiques', 'Langues', 'Physique', 'Architecture', 'Base de données', 'Réseaux'];
  const rooms = ['Salle N110', 'Salle N120', 'Amphi 1', 'Amphi 2', 'Labo Info'];

  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const totalMinutes = 510 + (i * 30);
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${hour.toString().padStart(2, '0')}h${minute.toString().padStart(2, '0')}`;
  });

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
    
    // Update date inputs
    const newWeekDates = getWeekDates(newDate);
    setStartDate(newWeekDates[0].toISOString().split('T')[0]);
    setEndDate(newWeekDates[6].toISOString().split('T')[0]);
  };

  const handleStartDateChange = (dateStr) => {
    setStartDate(dateStr);
    const newDate = new Date(dateStr);
    setCurrentDate(newDate);
    
    // Update end date to be 6 days later
    const endDateObj = new Date(newDate);
    endDateObj.setDate(newDate.getDate() + 6);
    setEndDate(endDateObj.toISOString().split('T')[0]);
  };

  const handleEndDateChange = (dateStr) => {
    setEndDate(dateStr);
  };

  const timeToPosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 510;
    const minutesFromStart = totalMinutes - startMinutes;
    return (minutesFromStart / 30) * 40;
  };

  const positionToTime = (position) => {
    const slots = Math.floor(position / 40);
    const totalMinutes = 510 + (slots * 30);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleAddEvent = (day, startTime) => {
    setFormData({
      title: '',
      room: 'Salle N110',
      level: 'Licence 1 - Informatique',
      module: 'Algorithmique',
      day,
      startTime,
      endTime: positionToTime(timeToPosition(startTime) + 80),
      color: '#ef9a9a'
    });
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setFormData(event);
    setEditingEvent(event.id);
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent ? { ...formData, id: editingEvent } : e));
    } else {
      setEvents([...events, { ...formData, id: Date.now().toString() }]);
    }
    setShowModal(false);
    setFormData({ title: '', room: '', level: '', module: '', day: 2, startTime: '08:30', endTime: '11:00', color: '#ef9a9a' });
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getEventHeight = (startTime, endTime) => {
    return timeToPosition(endTime) - timeToPosition(startTime) - 4;
  };

  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    if (selectedLevel && event.level !== selectedLevel) return false;
    if (selectedModule && event.module !== selectedModule) return false;
    if (selectedRoom && event.room !== selectedRoom) return false;
    return true;
  });

  return (
    <div className="w-full min-h-screen p-2 sm:p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[1600px] mx-auto">
        
        {/* Filter Section */}
        <div className="bg-gray-300 px-4 py-3 border-b">
          <div className="flex items-center gap-2 mb-3">
            <Filter />
            <h3 className="font-semibold text-sm">Filtrer par :</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Par Niveau :</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="flex-1 border border-gray-400 rounded px-3 py-1.5 text-sm bg-white"
              >
                <option value="">Tous les niveaux</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Par Modules :</label>
              <select 
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="flex-1 border border-gray-400 rounded px-3 py-1.5 text-sm bg-white"
              >
                <option value="">Sélectionnez un module</option>
                {modules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium whitespace-nowrap">Par Salles :</label>
              <select 
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="flex-1 border border-gray-400 rounded px-3 py-1.5 text-sm bg-white"
              >
                <option value="">Toutes les salles</option>
                {rooms.map(room => (
                  <option key={room} value={room}>{room}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="bg-gray-200 px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar />
            <h1 className="text-sm sm:text-base md:text-lg font-semibold">
              Calendrier de la semaine {weekDates[0].getDate()} Novembre 2025
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-1">
              <span className="text-sm">Date de début :</span>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="border border-gray-400 rounded px-2 py-1 text-xs bg-white" 
              />
            </div>
            <span className="text-sm">au</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">Date de fin :</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="border border-gray-400 rounded px-2 py-1 text-xs bg-white" 
              />
            </div>
            <button onClick={() => navigateWeek(-1)} className="p-1.5 hover:bg-gray-300 rounded">
              <ChevronLeft />
            </button>
            <button onClick={() => navigateWeek(1)} className="p-1.5 hover:bg-gray-300 rounded">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex overflow-x-auto">
          {/* Time column */}
          <div className="w-14 sm:w-16 bg-gray-200 border-r border-gray-300 shrink-0">
            <div className="h-10 sm:h-12 border-b border-gray-300"></div>
            {timeSlots.map((time, i) => (
              <div key={i} className="h-10 border-b border-gray-300 text-[10px] sm:text-xs text-gray-700 px-1 py-1 font-medium">
                {time}
              </div>
            ))}
          </div>

          {/* Days columns */}
          <div className="flex-1 flex min-w-[600px]">
            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="flex-1 border-r border-gray-300 last:border-r-0 min-w-20">
                {/* Day header */}
                <div className="h-10 sm:h-12 border-b border-gray-300 bg-gray-200 text-center py-1 px-1">
                  <div className="font-bold text-[11px] sm:text-sm">{day}</div>
                  <div className="text-[9px] sm:text-xs text-gray-600">{weekDates[dayIndex].getDate()} Novembre 2025</div>
                </div>
                
                {/* Day grid */}
                <div className="relative bg-gray-100" style={{ height: `${timeSlots.length * 40}px` }}>
                  {timeSlots.map((_, i) => (
                    <div 
                      key={i} 
                      className="h-10 border-b border-gray-300 hover:bg-blue-50 cursor-pointer transition"
                      onClick={() => handleAddEvent(dayIndex + 1, positionToTime(i * 40))}
                    />
                  ))}
                  
                  {/* Events */}
                  {filteredEvents
                    .filter(event => event.day === dayIndex + 1)
                    .map(event => (
                      <div
                        key={event.id}
                        className="absolute left-1 right-1 rounded shadow-md p-1.5 sm:p-2 text-white text-[9px] sm:text-xs overflow-hidden group cursor-pointer hover:shadow-lg transition"
                        style={{
                          top: `${timeToPosition(event.startTime) + 2}px`,
                          height: `${getEventHeight(event.startTime, event.endTime)}px`,
                          backgroundColor: event.color
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                      >
                        <div className="flex justify-between items-start h-full">
                          <div className="flex-1 overflow-hidden">
                            <div className="font-bold text-[10px] sm:text-sm mb-0.5 truncate">{event.title}</div>
                            <div className="text-[9px] sm:text-xs opacity-90 truncate">{event.room}</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition ml-1 shrink-0"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">
                {editingEvent ? 'Modifier' : 'Nouvel examen'}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Ex: Algorithmique 1"
                  style={{ 
                    backgroundColor: editingEvent ? formData.color : 'white',
                    color: editingEvent ? 'white' : 'black',
                    opacity: editingEvent ? 0.9 : 1
                  }}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Niveau</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ 
                    backgroundColor: editingEvent ? formData.color : 'white',
                    color: editingEvent ? 'white' : 'black',
                    opacity: editingEvent ? 0.9 : 1
                  }}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Module</label>
                <select
                  value={formData.module}
                  onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ 
                    backgroundColor: editingEvent ? formData.color : 'white',
                    color: editingEvent ? 'white' : 'black',
                    opacity: editingEvent ? 0.9 : 1
                  }}
                >
                  {modules.map(module => (
                    <option key={module} value={module}>{module}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Salle</label>
                <select
                  value={formData.room}
                  onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ 
                    backgroundColor: editingEvent ? formData.color : 'white',
                    color: editingEvent ? 'white' : 'black',
                    opacity: editingEvent ? 0.9 : 1
                  }}
                >
                  {rooms.map(room => (
                    <option key={room} value={room}>{room}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Jour</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ 
                    backgroundColor: editingEvent ? formData.color : 'white',
                    color: editingEvent ? 'white' : 'black',
                    opacity: editingEvent ? 0.9 : 1
                  }}
                >
                  {weekDays.map((day, i) => (
                    <option key={i} value={i + 1}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Début</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                    min="08:30"
                    max="16:00"
                    style={{ 
                      backgroundColor: editingEvent ? formData.color : 'white',
                      color: editingEvent ? 'white' : 'black',
                      opacity: editingEvent ? 0.9 : 1
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Fin</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm"
                    min="08:30"
                    max="16:00"
                    style={{ 
                      backgroundColor: editingEvent ? formData.color : 'white',
                      color: editingEvent ? 'white' : 'black',
                      opacity: editingEvent ? 0.9 : 1
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Couleur</label>
                <div className="flex gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded border-2 ${formData.color === color.value ? 'border-gray-800' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-sm border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveEvent}
                className="flex-1 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Save />
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamCalendar;