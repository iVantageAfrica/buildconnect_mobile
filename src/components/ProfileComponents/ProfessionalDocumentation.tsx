import { View, Text } from 'react-native'
import React from 'react'
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import ImageUploadComponent from '../Forms/ImageForm';
import { reportImage } from '@/src/constants/icon';

const ProfessionalDocumentation = () => {
    const {
        control,
      } = useFormContext();
    const { errors } = useFormState({ control });
 
  return (
    <View>
      <View>
         <Controller
          control={control}
          name="profilePhoto"
          render={() => (
            <ImageUploadComponent
            title="Upload License Document"
            image={reportImage}
            label={"Business/Contractor License"}
            note="PNG, JPG, PDF(max. 5MB)"
              control={control}
              name="contractorLicense"
              error={errors.contractorLicense?.message as string | undefined}
            />
          )}
        />
      </View>
       <View className="pt-2">
         <Controller
          control={control}
          name="profilePhoto"
          render={() => (
            <ImageUploadComponent
            title="Upload Insurance Certificate"
            image={reportImage}
            label={"Insurance Documentation"}
            note="Liability & Workers Compensation"
              control={control}
              name="insuranceDocumentation"
              error={errors.insuranceDocumentation?.message as string | undefined}
            />
          )}
        />
      </View>
       <View className="pt-2">
         <Controller
          control={control}
          name="profilePhoto"
          render={() => (
            <ImageUploadComponent
            title="Upload Certifications"
            image={reportImage}
            label={"Additional Certifications (Optional)"}
            note="Trade certifications, safety training, etc."
              control={control}
              name="additionalInformation"
              error={errors.additionalInformation?.message as string | undefined}
            />
          )}
        />
      </View>
    </View>
  )
}

export default ProfessionalDocumentation