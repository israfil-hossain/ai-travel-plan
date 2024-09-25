import { StyleSheet, Image, Platform, TouchableOpacity, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { auth } from '../../configs/FirebaseConfig';
import useAuthStore from '../../store/auth-store';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { logout  } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      logout();
      router.replace("auth/sign-in");  // Navigate back to the sign-in screen
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };
  return (
    <ParallaxScrollView
    >
     <TouchableOpacity onPress={()=> handleLogout() } >
      <Text className="text-[20px] text-white ">Logout</Text>
     </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
