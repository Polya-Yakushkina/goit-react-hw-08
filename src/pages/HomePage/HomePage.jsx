import PageTitle from "../../components/PageTitle/PageTitle";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import clsx from "clsx";
import css from "./HomePage.module.css";

export default function HomePage() {
    const features = [
        {
            title: "Always with You",
            subtitle: "Access 24/7",
            description: "Never miss a contact again! With our app, you can access your phonebook anytime, anywhere."
        },
        {
            title: "Easy to Use",
            subtitle: "Add, Edit, and Delete Contacts",
            description: "Manage your contacts effortlessly. Whether you want to add a new contact, edit existing information, or remove someone from your list, our user-friendly interface makes it simple."
        },
        {
            title: "Seamless Syncing",
            subtitle: "Sync Across Devices",
            description: "Access your contacts from any device. Our app automatically syncs your phonebook, ensuring you have the most up-to-date information at all times."
        },
        {
            title: "Secure and Private",
            subtitle: "Your Data, Your Control",
            description: "Rest easy knowing your information is secure. We prioritize your privacy and ensure your data is protected."
        },
        {
            title: "Simple and Fast",
            subtitle: "Quick Search Functionality",
            description: "Find any contact in seconds with our powerful search feature. No more scrolling through endless lists!"
        },
    ];

    const [visibleFeatures, setVisibleFeatures] = useState([]);

    useEffect(() => {
         features.forEach((feature, index) => {
            setTimeout(() => {
                setVisibleFeatures((prev) => {
                    if (!prev.some(f => f.title === feature.title)) {
                        return [...prev, feature];
                    }
                    return prev;
                });
            }, index * 2000);
        });
    }, []);

    return (
        <div className={clsx(css.container)}>
            <PageTitle className={clsx(css.text)}>
                Create Your Phonebook {" "}
            </PageTitle>

            {visibleFeatures.map((feature, index) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    key={index}
                >
                    <Accordion className={clsx(css.accordion)} style={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                            style={{ transition: 'background-color 0.3s' }}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Typography variant="h6" style={{ fontSize: '26px', fontWeight: 'bold' }}>{feature.title}</Typography>
                            <Typography variant="subtitle1" style={{ fontSize: '22px', marginLeft: '8px' }}>
                                {feature.subtitle}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography style={{ fontSize: '20px' }}>{feature.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </motion.div>
            ))}
        </div>
    );
}
