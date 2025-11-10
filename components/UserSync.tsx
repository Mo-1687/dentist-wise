"use client";
import { syncUser } from "@/lib/actions/users";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const UserSync = () => {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    handleUserSync();
  }, [isLoaded, isSignedIn]);

  async function handleUserSync() {
    if (isLoaded && isSignedIn) {
      try {
        await syncUser();
      } catch (error) {
        console.log("Error syncing user:", error);
      }
    }
  }

  return null;
};

export default UserSync;
