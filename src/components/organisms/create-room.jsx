import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AppService from '../../services/app.service';

const CreateRoom = () => {
    const history = useHistory();
    const [roomName, setRoomName] = useState('');
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const createRoom = async () => {
        if (!roomName.trim()) {
            return;
        }

        setLoading(true);
        try {
            const playerId = localStorage.getItem('player_id');
            if (!playerId) {
                alert('Player ID not found. Please refresh and try again.');
                if (isMountedRef.current) {
                    setLoading(false);
                }
                return;
            }
            const room = await AppService.CreateRoom(roomName.trim(), playerId);
            localStorage.setItem('owned_room_id', room.room_id); // Save room_id to localStorage to identify as owner
            history.push(`/sala?room_id=${room.room_id}`);
        } catch (error) {
            console.error('Error creating room:', error);
            alert('Failed to create room. Please try again.');
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full flex justify-center items-center gap-x-3">
            <h2 className="text-2xl font-semibold">Nova Sala</h2>
            <input
                type="text"
                placeholder="Nome da sala"
                onChange={(e) => setRoomName(e.target.value)}
                className="w-6/12 px-4 py-2 rounded-lg border-2 border-red-500 bg-white/90"
            />
            <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                onClick={createRoom}
                disabled={loading}
            >
                {loading ? '...' : '>'}
            </button>
        </div>
    );
};

export default CreateRoom;
