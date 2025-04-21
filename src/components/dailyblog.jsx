import React, { useEffect, useState } from 'react';
import { saveEntry, getAllEntries } from '../indexeddb/db';

const topicOfTheDay = "The importance of morning routines"; // This can be dynamic later

export default function ChatBlog() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const all = await getAllEntries();
      setEntries(all.sort((a, b) => a.timestamp - b.timestamp));
    };
    fetchEntries();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const entry = {
      timestamp: Date.now(),
      text: message,
      topic: topicOfTheDay,
    };

    await saveEntry(entry);
    setEntries([...entries, entry]);
    setMessage('');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Topic of the Day</h2>
      <p className="mb-4 text-gray-700">{topicOfTheDay}</p>

      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50 rounded">
        {entries.map((e) => (
          <div key={e.timestamp} className="mb-2">
            <div className="bg-blue-100 p-2 rounded text-sm">{e.text}</div>
            <div className="text-xs text-gray-500">
              {new Date(e.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border rounded p-2 mr-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your thoughts..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
