import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig'; // Adjust the import according to your project structure
import { useUser } from './UserContext';

interface QuestContextType {
    questID: string;
    prompt: string;
    matchString: string[];
    loading: boolean;
    questImage: string;
}

interface QuestContextProviderType extends QuestContextType {
    initQuest: () => void;
    fetchRandomQuest: () => void;
}

interface QuestProviderProps {
    children: ReactNode;
}

const QuestContext = createContext<QuestContextProviderType | undefined>(undefined);

export const QuestProvider: React.FC<QuestProviderProps> = ({ children }) => {
    const { userUID, setCurrentQuest } = useUser();
    const [quest, setQuest] = useState<QuestContextType>({
        questID: "",
        prompt: "",
        matchString: [],
        loading: true,
        questImage: ""
    });

    useEffect(() => {
        if (userUID) {
            initQuest();
        }
    }, [userUID]);

    const initQuest = async () => {
        if (userUID) {
            try {
                const userDocRef = doc(db, "users", userUID);
                const userDocSnap = await getDoc(userDocRef);
                console.log("got user doc")
                const userData = userDocSnap.data();

                if (userData && userData.currentQuest) {
                    console.log("inside the inner if block");
                    console.log("currentQuest:",userData.currentQuest);
                    const questDocRef = doc(db, "prompts", userData.currentQuest);
                    
                    const questDoc = await getDoc(questDocRef);
                    if (questDoc.exists()) {
                        console.log("questDoc exists")
                        setQuest({ ...(questDoc.data() as QuestContextType), loading: false });
                    } else {
                        console.error("Quest document not found");
                    }
                } else {
                    console.error("User data or currentQuest not found");
                }
            } catch (error) {
                console.error("Error fetching quest:", error);
            }
        } else {
            console.error("User UID not found");
        }
    };

    const fetchRandomQuest = async () => {
        setQuest(prevQuest => ({ ...prevQuest, loading: true }));
        try {
            const collectionRef = collection(db, 'prompts'); // Changed to 'prompts' to match your quest data
            const snapshot = await getDocs(collectionRef);
            const docs = snapshot.docs;
            const randomDoc = docs[Math.floor(Math.random() * docs.length)];
            if (userUID) {
                setCurrentQuest(randomDoc.id);
                setQuest({ ...(randomDoc.data() as QuestContextType), loading: false });
            } else {
                console.error("Invalid user");
            }
        } catch (error) {
            console.error('Error fetching random document:', error);
        } finally {
            setQuest(prevQuest => ({ ...prevQuest, loading: false }));
        }
    };

    return (
        <QuestContext.Provider value={{ ...quest, initQuest, fetchRandomQuest }}>
            {children}
        </QuestContext.Provider>
    );
};

export const useQuest = () => {
    const context = useContext(QuestContext);
    if (context === undefined) {
        throw new Error('useQuest must be used within a QuestProvider');
    }
    return context;
};
