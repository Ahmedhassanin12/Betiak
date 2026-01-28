import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();

  const hasMounted = useRef(false);

  useEffect(() => {
    // Wait until first render finishes
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const inAuthGroup = (segments as string[]).includes("(auth)");
    

    if (!inAuthGroup) {
      router.replace("../(auth)/login");
      console.log("From here2")
    }
  }, [router, segments]);

  return <Slot />;
}
