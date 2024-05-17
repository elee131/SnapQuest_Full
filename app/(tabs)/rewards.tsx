import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface DiscountCode {
  id: string;
  code: string;
  description: string;
  redeemed: boolean;
  rewardValue: number; // Added field to represent reward value associated with the discount code
}

// Sample data including a 'redeemed' field and 'rewardValue' field
const discountCodes: DiscountCode[] = [
  { id: '1', code: '10OFF', description: '10% Off on Arcteryx Beta Jacket', redeemed: false, rewardValue: 150 },
  { id: '2', code: '5CASHBACK', description: '5% Cashback on Next Purchase at Arcteryx', redeemed: false, rewardValue: 40 },
  { id: '3', code: 'BRINGAFRIEND', description: 'Bring a guest to our Bollywood Dance Class for free', redeemed: true, rewardValue: 50 },
  { id: '4', code: 'FREESPIN', description: 'One Free Spin Class', redeemed: true, rewardValue: 15 },
  { id: '5', code: '20OFF', description: 'Get 20% off on Arcteryx Alpha Gloves', redeemed: true, rewardValue: 35 }
];

const RewardScreen = () => {
  const [currentPoints, setCurrentPoints] = useState(105);
  const [coupons, setCoupons] = useState<DiscountCode[]>(discountCodes);

  const buyCoupon = (item: DiscountCode) => {
    if (item.redeemed) {
      Alert.alert(
        'Already Redeemed',
        `This coupon ${item.code} has already been redeemed.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } else if (currentPoints >= item.rewardValue) {
      Alert.alert(
        'Confirm Purchase',
        `Do you want to buy the coupon ${item.code}?`,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
          { text: 'Buy', onPress: () => handleBuy(item) }
        ]
      );
    } else {
      Alert.alert(
        'Insufficient Rewards',
        `You don't have enough rewards to buy this coupon.`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    }
  };

  const handleBuy = (item: DiscountCode) => {
    if (!item.redeemed) {
      setCurrentPoints(currentPoints - item.rewardValue);

      // Update the coupon to mark it as redeemed
      const updatedCoupons = coupons.map(coupon =>
        coupon.id === item.id ? { ...coupon, redeemed: true } : coupon
      );
      setCoupons(updatedCoupons);

      Alert.alert(
        'Coupon Purchased',
        `You have successfully purchased the coupon ${item.code}.`
      );
    }
  };

  const renderDiscountCodeItem = ({ item }: { item: DiscountCode }) => (
    <TouchableOpacity
      style={[styles.discountCodeItem, item.redeemed && styles.redeemedReward]}
      onPress={() => buyCoupon(item)}
    >
      <Text style={styles.discountCode}>{item.code}</Text>
      <Text style={styles.discountDescription}>{item.description}</Text>
      <Text style={styles.rewardValue}>Reward Value: {item.rewardValue} </Text>
      {item.redeemed ? (
        <Text style={styles.redeemedLabel}>Redeemed</Text>
      ) : (
        <Text style={styles.redeemedLabel}>Not Redeemed</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}><FontAwesome5 name="crown" size={20} color="black" /> Current Points <FontAwesome5 name="crown" size={20} color="black" /> </Text>
        <Text style={styles.pointsValue}>{currentPoints} </Text>
      </View>
      <Text style={styles.rewardHeading}>Rewards</Text>
      <FlatList
        data={coupons}
        renderItem={renderDiscountCodeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.discountList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  pointsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700', // Gold color for premium feel
    borderRadius: 20,
    margin: 20,
    paddingVertical: 40,
    paddingHorizontal: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pointsLabel: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  discountList: {
    paddingHorizontal: 20,
  },
  discountCodeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  discountCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63', // A color that pops, for the code
    marginBottom: 4,
  },
  discountDescription: {
    fontSize: 14,
    color: '#555555', // Subtle color for description
  },
  rewardValue: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 4,
  },
  redeemedReward: {
    backgroundColor: '#CCCCCC', // A different color to indicate redemption
  },
  redeemedLabel: {
    fontSize: 14,
    color: '#777777',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default RewardScreen;
