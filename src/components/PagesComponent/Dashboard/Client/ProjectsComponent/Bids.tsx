import GradientButton from "@/src/components/Buttons/GradientButton";
import { BidsCard } from "@/src/components/Cards/BidsCard"
import { ClientBidCard } from "@/src/components/Cards/ClientBidCard";
import { ContractorCard } from "@/src/components/Cards/ContractCard"
import { ContractorListItem } from "@/src/components/Cards/ContractorListItem";
import { RootStackParamList } from "@/src/navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, TouchableOpacity, View, Text } from "react-native"



const Bids = (projectId:{projectId : string}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
  const comparebids = () => {
       navigation.replace("CompareBidsScreen");

  }
  const contractors = [
  {
    id: 1,
    name: 'Elite Builders',
    rating: 4.5,
    reviews: 81,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Craftsman Constructors',
    rating: 4.7,
    reviews: 62,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Pro Renovators',
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Master Contractors',
    rating: 4.6,
    reviews: 73,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop'
  }
];

const bids = [
  {
    id: 1,
    company: 'BuildRight Inc.',
    isNew: true,
    duration: 12,
    description: 'Includes premium materials and a dedicated project manager that will help you. Focus on timeline efficiency....',
    amount: 84000000,
  },
  {
    id: 2,
    company: 'Elite Construction Co.',
    isNew: false,
    duration: 10,
    description: 'Complete renovation package with modern materials. Our experienced team ensures quality work....',
    amount: 72500000,
  },
  {
    id: 3,
    company: 'Premium Builders Ltd.',
    isNew: true,
    duration: 14,
    description: 'Full-service construction with premium finishes and warranty. Dedicated support throughout....',
    amount: 95000000,
  },
];
  return (
    <View className="flex-1  pt-4">
   <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2"> 
      <View className="flex flex-row overflow-x-auto px-3">
        {contractors.map(contractor => (
          <ContractorCard  key={contractor.id} contractor={contractor} contractorid ={contractor.id} />
        ))}
      </View>
</ScrollView>

<View className="mt-8 mx-4">
   <View className="mx-3 flex-row justify-between ">
               <Text className="font-interbold  text-xl mb-4 text-gray-900">
                Submitted(3)
              </Text>
               
              <TouchableOpacity  className="">
                <Text className="font-inter">View all</Text>
              </TouchableOpacity>
                
              </View>
      {bids.map(bid => (
        <ClientBidCard key={bid.id} bid={bid} />
      ))}

</View>

<View className="px-4 pt-4">
     <Text className="font-interbold  text-xl mb-4 text-gray-900">
                Selected Builders(3)
              </Text>
  {contractors.map(contractor => (
        <ContractorListItem 
          key={contractor.id}
          contractor={contractor} 
          onPress={() => console.log('Selected:', contractor.name)}
        />
      ))}
</View>
<View className="mx-4 my-6">
  <GradientButton onPress={comparebids} title="Compare Bids" />
</View>
    </View>
  )
}

export default Bids