import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import GradientButton from "@/src/components/Buttons/GradientButton";
import AppLayout from "@/src/components/Layouts/AppLayout";
import AttachDocuments from "@/src/components/Miscallaneous/AttachDocuments";
import { useProjects } from "@/src/core/hooks/useProjects";
import EmptyScreenComponent from "@/src/components/Miscallaneous/EmptyScreenComponent";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react-native";


const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1503387769-00f7c6f348c5?w=400&h=200&fit=crop';

const ProjectDetailsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { projectId } = route.params as { projectId: string };
  const { singleProjectMarketPlaceQuery } = useProjects();
  const { data, isLoading, error } = singleProjectMarketPlaceQuery(projectId);


  const apiResponse = data?.data;
  const projectData = apiResponse?.data || apiResponse; // Handle both nested structures
  
  const handleSubmitBid = () => {
    navigation.navigate("SubmitBid", { projectId });
  };

  // Helper function to safely get status
  const getStatus = () => {
    return projectData?.status || 'unknown';
  };

  // Helper function to format status
  const formatStatus = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  // Show loading state
  if (isLoading) {
    return (
      <AppLayout screenName="Project Details">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600">Loading project details...</Text>
        </View>
      </AppLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <AppLayout screenName="Project Details">
        <View className="flex-1 justify-center items-center p-4">
          <EmptyScreenComponent 
            title="Unable to Load Project"
            message="There was an error loading the project details. Please try again."
          />
        </View>
      </AppLayout>
    );
  }

  // Show if no project data
  if (!projectData) {
    return (
      <AppLayout screenName="Project Details">
        <View className="flex-1 justify-center items-center p-4">
          <EmptyScreenComponent 
            title="Project Not Found"
            message="The project you're looking for doesn't exist or has been removed."
          />
        </View>
      </AppLayout>
    );
  }

  // Safely get values with defaults
  const title = projectData.title || "Untitled Project";
  const description = projectData.description || "No description available";
  const location = projectData.location || "Location not specified";
  const startDate = projectData.startDate || "Not specified";
  const endDate = projectData.endDate || "Not specified";
  const bidCount = projectData.bidCount || 0;
  const status = getStatus();
  const budgetRange = projectData.budgetRange || {};
  const timeline = projectData.timeline || {};
  const projectType = projectData.projectType || {};
  const requiredSkills = projectData.requiredSkills || [];
  const attachedDocuments = projectData.attachedDocuments || [];
  const deadlinePassed = projectData.deadlinePassed || false;
  const owner = projectData.owner || {};
  const applicationDeadline = projectData.applicationDeadline || "Not specified";

  return (
    <AppLayout screenName="Project Details">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Project Image */}
        <View className="flex-row justify-center pt-4">
          <Image
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
            source={{ uri: PLACEHOLDER_IMAGE }}
          />
        </View>

        <View className="px-6">
          {/* Project Title */}
          <Text className="font-worksanssemibold text-2xl pt-4">
            {title}
          </Text>
          
          {/* Posted by (owner info) */}
          {owner && Object.keys(owner).length > 0 && (
            <Text className="font-inter pt-2 text-gray-600">
              Posted by: {(owner as any)?.name || "Anonymous"}
            </Text>
          )}

          {/* Status Badge */}
          <View className="mt-3">
            <View className={`inline-flex px-3 py-1 rounded-full ${
              status === 'draft' ? 'bg-yellow-100' :
              status === 'posted' ? 'bg-blue-100' :
              status === 'in_progress' ? 'bg-purple-100' :
              status === 'completed' ? 'bg-green-100' :
              'bg-red-100'
            }`}>
              <Text className={`text-xs font-medium ${
                status === 'draft' ? 'text-yellow-800' :
                status === 'posted' ? 'text-blue-800' :
                status === 'in_progress' ? 'text-purple-800' :
                status === 'completed' ? 'text-green-800' :
                'text-red-800'
              }`}>
                {formatStatus(status)}
              </Text>
            </View>
          </View>

          {/* Budget and Timeline Cards */}
          <View className="flex-row gap-4 pt-6">
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-center mb-2">
                <DollarSign size={20} color="#3B82F6" />
                <Text className="text-center text-md font-inter text-gray-600 ml-2">Budget</Text>
              </View>
              <Text className="text-center text-xl font-worksanssemibold text-blue-600">
                {(budgetRange as any)?.label || "Not specified"}
              </Text>
            </View>
            
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-center mb-2">
                <Clock size={20} color="#3B82F6" />
                <Text className="text-center text-md font-inter text-gray-600 ml-2">Timeline</Text>
              </View>
              <Text className="text-center text-xl font-worksanssemibold text-gray-800">
                {(timeline as any)?.label || "Not specified"}
              </Text>
            </View>
          </View>

    
          <View className="pt-6">
            <Text className="font-worksanssemibold text-xl mb-3">Description</Text>
            <View className="flex-row">
              <Text className="text-3xl font-bold text-gray-400 mr-3">.</Text>
              <Text className="font-inter text-gray-600 flex-1">
                {description}
              </Text>
            </View>
          </View>

       
          <View className="pt-6">
            <Text className="font-worksanssemibold text-xl mb-3">
              Project Details
            </Text>
            
            <View className="space-y-4">
              {/* Location */}
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-3">
                  <MapPin size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="font-inter font-medium text-gray-800">Location</Text>
                  <Text className="font-inter text-gray-600">
                    {location}
                  </Text>
                </View>
              </View>
              
              {/* Project Type */}
              {Object.keys(projectType).length > 0 && (
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center mr-3">
                    <Briefcase size={20} color="#8B5CF6" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-inter font-medium text-gray-800">Project Type</Text>
                    <Text className="font-inter text-gray-600">
                      {(projectType as any)?.label || "Not specified"}
                    </Text>
                  </View>
                </View>
              )}
              
              {/* Dates */}
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mr-3">
                  <Calendar size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="font-inter font-medium text-gray-800">Project Duration</Text>
                  <Text className="font-inter text-gray-600">
                    {startDate} to {endDate}
                  </Text>
                </View>
              </View>
              
              {/* Bids */}
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mr-3">
                  <Users size={20} color="#F59E0B" />
                </View>
                <View className="flex-1">
                  <Text className="font-inter font-medium text-gray-800">Current Bids</Text>
                  <Text className="font-inter text-gray-600">
                    {bidCount} {bidCount === 1 ? 'bid' : 'bids'}
                  </Text>
                </View>
              </View>

              {/* Bid Deadline */}
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-3">
                  <AlertCircle size={20} color="#EF4444" />
                </View>
                <View className="flex-1">
                  <Text className="font-inter font-medium text-gray-800">Bid Deadline</Text>
                  <Text className="font-inter text-gray-600">
                    {applicationDeadline}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Required Skills */}
          {requiredSkills.length > 0 && (
            <View className="pt-6">
              <Text className="font-worksanssemibold text-xl mb-3">
                Required Skills
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {requiredSkills.map((skill, index) => (
                  <View 
                    key={index} 
                    className="flex-row items-center bg-blue-50 px-3 py-2 rounded-full"
                  >
                    <CheckCircle size={14} color="#3B82F6" className="mr-2" />
                    <Text className="text-blue-700">{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Attached Documents */}
          <View className="pt-6">
            <Text className="font-worksanssemibold text-xl mb-3">
              Attach Documents
            </Text>
            <View className="pt-2">
              <AttachDocuments documents={attachedDocuments} />
            </View>
          </View>

          {/* Client Requirements (Based on your design pattern) */}
          {projectData.requirements || projectData.clientRequirements ? (
            <View className="pt-6">
              <Text className="font-worksanssemibold text-xl mb-3">
                Client Requirements
              </Text>
              <View className="flex-row">
                <Text className="text-3xl font-bold text-gray-400 mr-3">.</Text>
                <Text className="font-inter text-gray-600 flex-1">
                  {projectData.requirements || projectData.clientRequirements || "No specific requirements mentioned."}
                </Text>
              </View>
            </View>
          ) : null}

          {/* Submit Bid Button */}
          <View className="pt-6 pb-8">
            <GradientButton 
              title="Submit Bid" 
              onPress={handleSubmitBid} 
              // disabled={deadlinePassed || status !== 'posted'}
            />
            
            {deadlinePassed && (
              <Text className="text-red-500 text-center mt-2 flex-row items-center justify-center">
                <AlertCircle size={16} color="#EF4444" className="mr-1" />
                The bid deadline has passed
              </Text>
            )}
            
            {status !== 'posted' && (
              <Text className="text-gray-500 text-center mt-2">
                This project is not currently accepting bids
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default ProjectDetailsScreen;