import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.scss";
import { useGetUserProfileQuery } from "./apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./reducers/userReducer";

const Home = lazy(() => import("./pages/Home.js"));

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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <h1>Hello Fundraisers!</h1>
    </Suspense>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppRouter;
