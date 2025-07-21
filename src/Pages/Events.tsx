import React, { useState, useEffect } from "react";
import { EventItem, EventService } from "@/Entities/Event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Tag, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const eventCategories = ["all", "worship", "community", "outreach", "education", "special"];

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const allEvents = await EventService.list('-date'); // ← return type: Promise<EventType[]>
      setEvents(allEvents);
      setFilteredEvents(allEvents);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.category === category));
    }
  }, [category, events]);

  return (
    <div className="bg-sky-950 min-h-screen">
      <header className="bg-deep-burgundy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Our Events Calendar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-stone-200 max-w-3xl mx-auto"
          >
            Find opportunities for worship, community connection, outreach, and learning. We look forward to seeing you.
          </motion.p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-end mb-8">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-stone-500" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {eventCategories.map(cat => (
                  <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-deep-burgundy animate-spin" />
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white h-full hover:shadow-2xl transition-shadow duration-300 border border-stone-200/80">
                  <CardHeader>
                    <CardTitle className="text-deep-burgundy text-xl">{event.title}</CardTitle>
                    <span className="text-sm font-medium text-accent-gold capitalize pt-1">{event.category}</span>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-stone-700">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-3 text-red-800" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-3 text-red-800" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-red-800" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-deep-burgundy">No Events Found</h3>
            <p className="mt-2 text-stone-600">There are no events matching your criteria. Please check back later!</p>
          </div>
        )}
      </main>
    </div>
  );
}