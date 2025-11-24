import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppService from '../../services/app.service';

const JoinRoom = () => {
    const history = useHistory();
    const [rooms, setRooms] = useState([]);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        fetchRooms();
        const interval = setInterval(fetchRooms, 3000);
        return () => {
            isMountedRef.current = false;
            clearInterval(interval);
        };
    }, []);

    const fetchRooms = async () => {
        try {
            const data = await AppService.GetAllRooms();
            if (isMountedRef.current) {
                setRooms(data || []);
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
            if (isMountedRef.current) {
                setRooms([]);
            }
        }
    };

    const joinRoom = (room) => {
        history.push(`/sala?room_id=${room.room_id}&sala=${encodeURIComponent(room.room_name)}&host=false`);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-semibold mb-6">Salas Disponiveis</h2>
            <div className="w-full overflow-y-auto pr-2" >
                {rooms.length === 0 ? (
                    <p className="text-gray-400 text-center">Nenhuma sala disponível</p>
                ) : (
                    <ul className="space-y-4 w-full">
                        {rooms.map((room) => (
                            <li
                                key={room.room_id}
                                className="w-full p-4 border border-gray-300/20 rounded-lg flex justify-between items-center bg-white/10 hover:bg-white/15"
                            >
                                <div>
                                    <div className="font-bold text-lg">{room.room_name}</div>
                                    <div className="text-gray-600 text-sm">
                                        Host: {room.owner_name}
                                    </div>
                                </div>
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                                    onClick={() => joinRoom(room)}
                                >
                                    Entrar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default JoinRoom;
