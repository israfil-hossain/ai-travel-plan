import { View, Text } from 'react-native'
import React from 'react'
import CircularChart from '../../components/Expense/CircularChart'

export default function MyExpense() {
  return (
    <View>
      <Text>BudgetList</Text>
      <CircularChart />
    </View>
  )
}