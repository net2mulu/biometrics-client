import { gql } from "@apollo/client";

// fetch by registration id
export const OSSC_LABOUR_DATA_RID = gql`
  query labor_data($_eq: registration_uuid = "") {
    registration_namespace {
      labors(where: { registration_id: { _eq: $_eq } }) {
        biometrics_completed
        birth_date
        disability
        father_name
        first_name
        gender
        grand_father_name
        id
        labor_id
        martial_status
        registration_id
        unemployment_period
        signature
        profile_picture
        ossc_id
        ossc_name
      }
    }
  }
`;