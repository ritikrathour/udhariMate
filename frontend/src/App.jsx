import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./layout/NavBar";
import { useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import Footer from "./layout/Footer";
import { GetUser } from "./ReduxStore/UserSlice";
import Loader from "./components/Loader";
import BorrowerProfile from "./Pages/BorrowerProfile";
import BreadCrumbs from "./components/Breadcrumbs"
import ScrollToTop from "./components/ScrollTop";
import PageNotFound from "./Pages/PageNotFound";
const Profile = lazy(() => import("./Pages/Profile"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const TransactionArea = lazy(() => import("./Pages/TransactionArea"));
const ProtectedRoute = lazy(() => import("./utils/ProtectedRoute"))
const Home = lazy(() => import("./Pages/Home"))
const Ladger = lazy(() => import("./Pages/Ladger"))
const SignIn = lazy(() => import("./Pages/SignIn"))
const SignUp = lazy(() => import("./Pages/SignUp"));
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUser());
  }, []);
  const { pathname } = useLocation(); 
  return (
    <>
      {/* header  */}
      <header className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </header>
      <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><Loader style="border-2 border-black" /> </div>}>
        <main className="px-2 mt-[68px] md:px-20 overflow-hidden">
          {pathname !== "/" && <BreadCrumbs />}
          <ScrollToTop />
          <Routes>
            <Route element={<Home />} path="/" />
            {/* ProtectedRoute*/}
            <Route element={<ProtectedRoute />}>
              <Route element={<Ladger />} path="/ladger" />
              <Route element={<TransactionArea />} path="/transacation-area/:id" />
              <Route element={<Profile />} path="/profile/:id" />
              <Route element={<BorrowerProfile />} path="/borrower-profile/:id" />
            </Route>
            {/* ProtectedRoute*/}
            <Route element={<ForgetPassword />} path="/forget-password" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<SignIn />} path="/signin" /> */
            <Route element={<PageNotFound/> } path="*" />
          </Routes>
        </main>
      </Suspense >
      {/* footer  */}
      <footer className="px-2 py-5 flex flex-col gap-4 mt-2">
        <Footer />
      </footer>
    </>
  )

}

export default App; 
