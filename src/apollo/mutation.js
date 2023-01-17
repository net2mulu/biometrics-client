import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      tokens {
        access_token
        refresh_token
      }
      data {
        email
        id
        phoneNumber
        role
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signin($password: String = "", $phoneNumber: String = "") {
    signIn(password: $password, phoneNumber: $phoneNumber) {
      data {
        email
        id
        role
        phoneNumber
      }
      tokens {
        access_token
        refresh_token
      }
    }
  }
`;



// find labour  by biometrics id
export const LABOR_BY_BIOMETRICS_ID = gql`
  query LABOR_BY_BIOMETRICS_ID($_eq: String = "") {
    registration_namespace {
      labors(where: { biometrics_id: { _eq: $_eq } }) {
        id
        biometrics_completed
        birth_date
        disability
        father_name
        first_name
        grand_father_name
        gender
        labor_id
        level_of_education
        martial_status
        record_number
        registration_id
        signature
        unemployment_period
        biometrics_id
        profile_picture
      }
    }
  }
`;