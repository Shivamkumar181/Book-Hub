// upd 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Library from './pages/Library'
import Support from './pages/Support'
import { AuthProvider } from './hooks/useAuth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/library" element={<Library />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App



// // upd
// // // src/App.jsx
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { AuthProvider } from './hooks/useAuth';
// // import Navbar from './components/Navbar';
// // import Footer from './components/Footer';
// // import Home from './pages/Home';
// // import Login from './pages/Login';
// // import Register from './pages/Register';
// // import ForgotPassword from './pages/ForgotPassword';
// // import ResetPassword from './pages/ResetPassword';
// // import Library from './pages/Library';
// // import Support from './pages/Support';
// // import UploadBook from './pages/UploadBook';
// // import BookDetail from './pages/BookDetail';
// // import Profile from './pages/Profile';
// // import ProtectedRoute from './components/ProtectedRoute';
// // import './index.css';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <div className="App flex flex-col min-h-screen">
// //           <Navbar />
// //           <main className="flex-grow">
// //             <Routes>
// //               <Route path="/" element={<Home />} />
// //               <Route path="/login" element={<Login />} />
// //               <Route path="/register" element={<Register />} />
// //               <Route path="/forgot-password" element={<ForgotPassword />} />
// //               <Route path="/reset-password" element={<ResetPassword />} />
// //               <Route path="/library" element={<Library />} />
// //               <Route path="/support" element={<Support />} />
// //               <Route path="/books/:id" element={<BookDetail />} />
// //               {/* <Route
// //                 path="/upload"
// //                 element={
// //                   <ProtectedRoute adminOnly={true}>
// //                     <UploadBook />
// //                   </ProtectedRoute>
// //                 }
// //               /> */}
// //               <Route path="/profile" element={
// //               <ProtectedRoute>
// //                 <Profile />
// //               </ProtectedRoute>
// //             } />
// //               {/* <Route
// //                 path="/profile"
// //                 element={
// //                   <ProtectedRoute>
// //                     <Profile />
// //                   </ProtectedRoute> */}
// //                   <Route path="/upload-book" element={
// //               <ProtectedRoute adminOnly={true}>
// //                 <UploadBook />
// //               </ProtectedRoute>
// //                 }
// //               />
// //             </Routes>
// //           </main>
// //           <Footer />
// //           <ToastContainer
// //             position="top-right"
// //             autoClose={3000}
// //             hideProgressBar={false}
// //             newestOnTop={false}
// //             closeOnClick
// //             rtl={false}
// //             pauseOnFocusLoss
// //             draggable
// //             pauseOnHover
// //             theme="light"
// //           />
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;



// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthProvider } from './hooks/useAuth';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/ResetPassword';
// import Library from './pages/Library';
// import Support from './pages/Support';
// import UploadBook from './pages/UploadBook';
// import BookDetail from './pages/BookDetail';
// import Profile from './pages/Profile';
// import ProtectedRoute from './components/ProtectedRoute';
// import './index.css';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App flex flex-col min-h-screen">
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/reset-password" element={<ResetPassword />} />
//               <Route path="/library" element={<Library />} />
//               <Route path="/support" element={<Support />} />
//               <Route path="/books/:id" element={<BookDetail />} />
//               <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/upload-book"
//                 element={
//                   <ProtectedRoute adminOnly={true}>
//                     <UploadBook />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>
//           </main>
//           <Footer />
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//           />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;