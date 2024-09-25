import React from "react";
import { Modal, View, Button, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapModal({ visible, onClose, location, placeName, address }) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        {location ? (
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              title={placeName}
              description={address}
            />
          </MapView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Location not available</Text>
          </View>
        )}

        {/* Close button */}
        <Button title="Close Map" onPress={onClose} />
      </View>
    </Modal>
  );
}
