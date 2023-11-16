import React from "react";
import {Tab, Tabs} from "@nextui-org/react";

export default function RecipeLayout(
    {children}: { children: React.ReactNode}) {


    return (
        <main>
            <h1>Recipe Layout</h1>
            <Tabs>
                <Tab key="public" title="public"/>

                <Tab key="private" title="private"/>
            </Tabs>
            {/* Include shared UI here e.g. a header or sidebar */}
            {children}
        </main>
    )
};