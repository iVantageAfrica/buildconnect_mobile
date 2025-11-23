import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { formatCurrency } from "@/src/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

interface Bid {
  company: string;
  isNew: boolean;
  duration: number;
  description: string;
  amount: number;
}

interface ClientBidCardProps {
  bid: Bid;
  bidId: string; 
}

export const ClientBidCard: React.FC<ClientBidCardProps> = ({ bid, bidId }) => {
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
const proposalscreen = () =>{
  navigation.replace("ProposalScreen", { 
    bidId:  bidId
   
  });
}


  return (
    <TouchableOpacity onPress={proposalscreen} className="bg-white rounded-2xl p-5 border border-gray-200 mb-4">
      <View className="flex flex-row justify-between items-center mb-3">
        <Text className="text-lg font-interbold text-gray-900">
          {bid.company}
        </Text>
        {bid.isNew && (
          <View className="bg-blue-100 rounded-full px-3 py-1">
            <Text className="text-blue-600 text-xs font-intersemibold">
              New
            </Text>
          </View>
        )}
      </View>

      <Text className="text-sm font-inter text-gray-500 mb-3">
        Estimated Duration: {bid.duration} months
      </Text>

      <Text className="text-sm font-inter text-gray-600 leading-5 mb-4">
        {bid.description}
      </Text>

      <View className="flex flex-row justify-between items-center">
        <Text className="text-xl font-interbold text-green-600">
          {formatCurrency(bid.amount)}
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-intersemibold text-gray-700">
            View Bid
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};