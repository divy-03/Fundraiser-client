import { useEffect } from "react";
import "./styles/app.scss";
import { useGetUserProfileQuery } from "./apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./reducers/userReducer";

const App = () => {
  const { user, loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    if (data) {
      dispatch(userExist(data.user));
    } else if (error) {
      dispatch(userNotExist());
    }
  }, [data, error, dispatch]);

  if (loading || isLoading) return <div>Loading...</div>;
  return (
    <>
      <h1>App</h1>
    </>
  );
};

export default App;
