import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
const UserPage = lazy(() => import('../pages/User'));

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route
                path="*"
                element={
                <Suspense fallback={<div>Loading...</div>}>
                    <UserPage />
                </Suspense>
                }
            />
        </Routes>
    );
};
