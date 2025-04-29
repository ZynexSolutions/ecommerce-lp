import { Client, Account } from "appwrite";

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export { ID } from "appwrite";

export const ensureAuthSession = async () => {
    try {
        // Try to get the current session
        const session = await account.get();
        return session; // User is already logged in
    } catch (e) {
        console.error('No session found, creating an anonymous session:', e);
        try {
            // If no session exists, create an anonymous session
            const anonymousSession = await account.createAnonymousSession();
            return anonymousSession;
        } catch (error) {
            console.error('Failed to create anonymous session:', error);
            throw error;
        }
    }
};