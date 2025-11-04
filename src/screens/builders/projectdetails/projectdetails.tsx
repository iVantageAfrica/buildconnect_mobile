import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { PROJECTSDETAILS } from "@/src/utils/data";
import GradientButton from "@/src/components/Buttons/GradientButton";
import AppLayout from "@/src/components/Layouts/AppLayout";
import AttachDocuments from "@/src/components/Miscallaneous/AttachDocuments";



const ProjectDetailsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { projectId } = route.params as { projectId: string };
  const hanldeSubmitBid = () => {
       navigation.navigate("SubmitBid");
  };

  return (
    <AppLayout screenName="Project Details">
      <View className=" flex-row justify-center">
        <Image
          style={{ width: 320, height: 200 }}
          resizeMode="contain"
          source={PROJECTSDETAILS[0].image}
        />
      </View>
      <View className="px-6">
        <Text className="font-worksanssemibold text-xl">
          {PROJECTSDETAILS[0].projectname}
        </Text>
        <Text className="font-inter pt-2">
          Posted by: {PROJECTSDETAILS[0].postedby}{" "}
        </Text>

        <View className="flex-row gap-4   pt-6 mx-1 ">
          <View className="bg-white p-5 rounded-xl sahdow-xl ">
            <Text className="text-center text-md font-inter">Budget</Text>
            <Text className="text-center text-2xl font-worksanssemibold ">
              {PROJECTSDETAILS[0].budget}
            </Text>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-xl  ">
            <Text className="text-center text-md font-inter">Timeline</Text>
            <Text className="text-center text-2xl font-worksanssemibold ">
              {PROJECTSDETAILS[0].timeline}
            </Text>
          </View>
        </View>
        <View className="pt-6">
          <Text className="font-worksanssemibold text-2xl">Description</Text>
          <Text className="font-inter text-gray-400 pt-4">
            {PROJECTSDETAILS[0].description}
          </Text>
        </View>

        <View className="pt-6">
          <Text className="font-worksanssemibold text-2xl">
            Client Requirements
          </Text>
          <View className="flex-row gap-4">
            <Text className="text-5xl font-bold ">.</Text>
            <Text className="font-inter text-gray-400 pt-6">
              {PROJECTSDETAILS[0].clientrq}
            </Text>
          </View>
        </View>

        <View className="pt-6">
          <Text className="font-worksanssemibold text-2xl">
            Attach Documents
          </Text>
          <View className="pt-4">
            <AttachDocuments />
          </View>
        </View>

        <View className="pt-6">
          <GradientButton title="Submit Bid" onPress={hanldeSubmitBid} />
        </View>
      </View>
 
    </AppLayout>
        
  );
};

export default ProjectDetailsScreen;
