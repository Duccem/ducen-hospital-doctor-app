import { gql, useMutation } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user)
  }
`;

export const useCreateUserMutation = () => {
  const [createUser, { data }] = useMutation(CREATE_USER_MUTATION);

  return { createUser, data };
};
