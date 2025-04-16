"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from '@supabase/supabase-js';
import React from "react";

// Initialize Supabase client - replace with your own URL and anon key
// IMPORTANT: Keep your Supabase URL and Anon Key secure and consider environment variables
const supabaseUrl = 'https://etoqmkuqtwtjhttcyfei.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0b3Fta3VxdHd0amh0dGN5ZmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NDQxNTgsImV4cCI6MjA2MDAyMDE1OH0.a4718opTbPX-HdEZ__6qL2fozvYPN8scHhRX9avDzGs'; // Replace with your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EnhancedForm() {
  // Consolidated state for form fields, errors, and status
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    reason: "", // Added reason field
    nameError: "",
    emailError: "",
    reasonError: "", // Added reason error field
    isSubmitting: false,
    isSubmitted: false,
    duplicateEmail: false
  });

  // --- Functions ---

  // Validates the form fields (name, email, and reason)
  const validateForm = () => {
    let valid = true;
    let nameError = "";
    let emailError = "";
    let reasonError = "";

    // Validate name
    if (!formState.name.trim()) {
      nameError = "Name is required";
      valid = false;
    }

    // Validate email
    if (!formState.email.trim()) {
      emailError = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) { // Simple regex for email format
      emailError = "Please enter a valid email address";
      valid = false;
    }

    // Validate reason (optional but limited to 500 chars if provided)
    if (formState.reason.trim() && formState.reason.length > 500) {
      reasonError = "Your reason must be less than 500 characters";
      valid = false;
    }

    // Update the form state with any validation errors
    setFormState(prev => ({ ...prev, nameError, emailError, reasonError }));
    return valid; // Return whether the form is valid
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset duplicate email flag and errors before validation
    setFormState(prev => ({ 
      ...prev, 
      duplicateEmail: false, 
      emailError: "", 
      nameError: "",
      reasonError: "" 
    }));

    // Proceed only if the form is valid
    if (validateForm()) {
      setFormState(prev => ({ ...prev, isSubmitting: true })); // Set submitting state

      const processedEmail = formState.email.toLowerCase().trim(); // Normalize email

      try {
        // Check if the email already exists in the database
        const { data: existingUsers, error: checkError } = await supabase
          .from('waitlist')
          .select('email', { count: 'exact' })
          .eq('email', processedEmail)
          .limit(1);

        // Check for RLS errors here too!
        if (checkError) {
            console.error("Error checking for existing email:", checkError.message);
            if (checkError.message.includes("security policy")) {
                 throw new Error("Cannot verify email due to security policy. Contact support.");
            }
            throw new Error("Could not verify email. Please try again.");
        }

        // If email already exists
        if (existingUsers && existingUsers.length > 0) {
          setFormState(prev => ({
            ...prev,
            isSubmitting: false,
            duplicateEmail: true // Set flag to show the "already on list" message
          }));
        } else {
          // Email doesn't exist, proceed to insert
          const { error: insertError } = await supabase
            .from('waitlist')
            .insert([
              {
                name: formState.name.trim(),
                email: processedEmail,
                reason: formState.reason.trim() // Add reason to the database
              }
            ]);

          // Check for RLS errors on INSERT!
          if (insertError) {
            console.error("Error inserting data:", insertError.message);
             if (insertError.message.includes("violates row-level security policy")) {
                 throw new Error("Could not add to waitlist due to security policy. Please contact support.");
             } else if (insertError.message.includes("unique constraint")) {
                 setFormState(prev => ({ ...prev, isSubmitting: false, duplicateEmail: true }));
                 return;
             }
            throw new Error("Could not add you to the waitlist. Please try again.");
          }

          // --- Success ---
          // Update UI to show success message
          setFormState(prev => ({
            ...prev,
            name: "", // Clear form fields on success
            email: "",
            reason: "",
            isSubmitting: false,
            isSubmitted: true, // Set flag to show success message
            duplicateEmail: false
          }));
        }
      } catch (error: unknown) {
        console.error('Error during submission process:', error);
        // Show the specific error message caught
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          emailError: error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
        }));
      }
    }
  };

  // Handles changes in form input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: "",
      duplicateEmail: name === "email" ? false : prev.duplicateEmail,
      emailError: name === "email" ? "" : prev.emailError
    }));
  };

  // Resets the form to its initial state
  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      reason: "",
      nameError: "",
      emailError: "",
      reasonError: "",
      isSubmitting: false,
      isSubmitted: false,
      duplicateEmail: false
    });
  };

  // --- Conditional Rendering ---

  // Render "Already on List" message if duplicateEmail is true
  if (formState.duplicateEmail) {
    return (
      <div className="relative max-w-md mx-auto mt-12 bg-black/20 border border-white/10 p-8 rounded-lg shadow-xl backdrop-blur-md text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          {/* Icon */}
          <div className="w-16 h-16 bg-yellow-500/20 border border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3">Already on the List!</h3>
          <p className="text-white/80 mb-6">
            Looks like <span className="font-medium text-yellow-400">{formState.email}</span> is already registered. We&apos;re excited to have you!
          </p>
          {/* Button to try again */}
          <motion.button
            onClick={resetForm}
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex justify-center py-3 px-4 rounded-md text-base font-medium text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 focus:ring-yellow-500 transition-all duration-200"
          >
            Enter a Different Email
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // --- Main Return (Form or Success Message) ---

  return (
    <div className="relative max-w-md mx-auto mt-12 bg-black/20 border border-white/10 p-8 rounded-lg shadow-xl backdrop-blur-md text-white">
      {formState.isSubmitted ? (
        // --- Success Message View ---
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Success! You&apos;re In!</h3>
          <p className="text-white/80 mb-4">You&apos;ve been added to the waiting list. We&apos;ll let you know when it&apos;s time.</p>

          {/* Optional: Add a button to reset or go back */}
           <motion.button
            onClick={resetForm}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 text-sm text-primary hover:underline"
          >
            Add another email?
          </motion.button>
        </motion.div>
      ) : (
        // --- Form View ---
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-6">
            {/* Name Input Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1.5">Name</label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  aria-invalid={!!formState.nameError}
                  aria-describedby="name-error"
                  className={`block w-full rounded-md border ${formState.nameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/30 hover:border-white/50 focus:border-primary focus:ring-primary'} bg-black/20 text-white px-4 py-3 focus:outline-none focus:ring-1 transition-colors duration-200`}
                />
                {formState.nameError && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                         <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-8.5a1 1 0 0 1 1 1V11a1 1 0 1 1-2 0V7.5a1 1 0 0 1 1-1ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                      </svg>
                      {formState.nameError}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Email Input Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  aria-invalid={!!formState.emailError || formState.duplicateEmail}
                  aria-describedby="email-error"
                  className={`block w-full rounded-md border ${formState.emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/30 hover:border-white/50 focus:border-primary focus:ring-primary'} bg-black/20 text-white px-4 py-3 focus:outline-none focus:ring-1 transition-colors duration-200`}
                />
                {formState.emailError && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                         <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-8.5a1 1 0 0 1 1 1V11a1 1 0 1 1-2 0V7.5a1 1 0 0 1 1-1ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                      </svg>
                     {formState.emailError}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Why You Need It Field - Simple Text Area */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="reason" className="block text-sm font-medium text-white/90">Why you need it</label>
              </div>
              <div className="relative">
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={formState.reason}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in our product..."
                  aria-invalid={!!formState.reasonError}
                  aria-describedby="reason-error"
                  className={`block w-full rounded-md border ${formState.reasonError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/30 hover:border-white/50 focus:border-primary focus:ring-primary'} bg-black/20 text-white px-4 py-3 focus:outline-none focus:ring-1 transition-colors duration-200`}
                />
                
                {formState.reasonError && (
                  <motion.p
                    id="reason-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm0-8.5a1 1 0 0 1 1 1V11a1 1 0 1 1-2 0V7.5a1 1 0 0 1 1-1ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                    {formState.reasonError}
                  </motion.p>
                )}
                
                {/* Character counter */}
                <div className="mt-1.5 flex justify-end">
                  <span className="text-xs text-white/50">{formState.reason.length}/500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: formState.isSubmitting ? 1 : 1.02, filter: formState.isSubmitting ? 'brightness(1)' : 'brightness(1.1)' }}
            whileTap={{ scale: formState.isSubmitting ? 1 : 0.98 }}
            disabled={formState.isSubmitting}
            className={`mt-8 w-full flex justify-center items-center py-3 px-4 rounded-md text-base font-medium text-black bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 focus:ring-primary transition-all duration-200 relative overflow-hidden ${formState.isSubmitting ? 'opacity-80 cursor-wait' : 'hover:bg-primary/90'}`}
          >
            <AnimatePresence mode="wait">
              {formState.isSubmitting ? (
                // Loading indicator inside button
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </motion.div>
              ) : (
                // Default button text
                <motion.span
                  key="submit-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  Join the Waiting List
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Terms and Privacy Links */}
          <p className="mt-4 text-xs text-center text-white/60">
            By joining, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      )}
    </div>
  );
}