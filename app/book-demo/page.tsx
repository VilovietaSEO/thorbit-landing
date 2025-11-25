"use client";

import Link from "next/link";
import { Menu, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const BUSINESS_SIZES = [
  { value: "", label: "Select business size" },
  { value: "<1M", label: "Less than $1M" },
  { value: "1-5M", label: "$1M - $5M" },
  { value: "5-10M", label: "$5M - $10M" },
  { value: "10-100M", label: "$10M - $100M" },
  { value: "100M+", label: "$100M+" },
];

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_ad_set", "utm_term", "utm_content"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  businessSize: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_ad_set: string;
  utm_term: string;
  utm_content: string;
}

export default function BookDemoPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    businessSize: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_ad_set: "",
    utm_term: "",
    utm_content: "",
  });

  // Capture UTM parameters from URL and sessionStorage
  useEffect(() => {
    const getUtmFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      UTM_PARAMS.forEach(param => {
        const value = params.get(param);
        if (value) utm[param] = value;
      });
      return utm;
    };

    const getStoredUtm = () => {
      const stored = sessionStorage.getItem("utm_params");
      return stored ? JSON.parse(stored) : {};
    };

    const storeUtm = (utm: Record<string, string>) => {
      if (Object.keys(utm).length > 0) {
        sessionStorage.setItem("utm_params", JSON.stringify(utm));
      }
    };

    // Get UTM from URL first, then merge with stored
    const urlUtm = getUtmFromUrl();
    const storedUtm = getStoredUtm();
    const mergedUtm = { ...storedUtm, ...urlUtm };

    // Store for persistence across page navigation
    storeUtm(urlUtm);

    // Update form data with UTM values
    setFormData(prev => ({
      ...prev,
      utm_source: mergedUtm.utm_source || "",
      utm_medium: mergedUtm.utm_medium || "",
      utm_campaign: mergedUtm.utm_campaign || "",
      utm_ad_set: mergedUtm.utm_ad_set || "",
      utm_term: mergedUtm.utm_term || "",
      utm_content: mergedUtm.utm_content || "",
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/ghl/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Submission failed");
      }

      setSubmitStatus("success");
      // Reset form but keep UTM data
      setFormData(prev => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companyName: "",
        businessSize: "",
      }));
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl md:text-4xl font-black text-text-primary tracking-tight">
            Thorbit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/why-us" className="text-text-secondary hover:text-teal transition-colors font-light">
              Why Us
            </Link>
            <Link
              href="/book-demo"
              className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-2.5 rounded-lg font-medium transition-all hover:-translate-y-0.5"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-light bg-bg-primary">
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link
                href="/why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-teal transition-colors font-light py-2"
              >
                Why Us
              </Link>
              <Link
                href="/book-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary hover:bg-primary-dark text-bg-primary px-5 py-3 rounded-lg font-medium transition-all text-center"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-medium mb-4 tracking-wide uppercase text-sm">GET STARTED</p>
          <h1 className="text-4xl md:text-5xl font-black text-text-primary leading-tight mb-6">
            Book Your Demo
          </h1>
          <p className="text-xl font-light text-text-secondary leading-relaxed">
            See how Thorbit can transform your content strategy with AI-powered research, analysis, and execution.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border-2 border-border-light p-8 md:p-10" style={{ boxShadow: 'var(--shadow-lg)' }}>

            {submitStatus === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-high/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-high" />
                </div>
                <h2 className="text-2xl font-black text-text-primary mb-4">Thank You!</h2>
                <p className="text-text-secondary font-light mb-6">
                  We've received your request and will be in touch shortly to schedule your demo.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-primary hover:bg-primary-dark text-bg-primary px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                      First Name <span className="text-low">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                      Last Name <span className="text-low">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email Address <span className="text-low">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number <span className="text-low">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-text-primary mb-2">
                    Company Name <span className="text-low">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary placeholder-text-tertiary focus:border-primary focus:outline-none transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Business Size */}
                <div>
                  <label htmlFor="businessSize" className="block text-sm font-medium text-text-primary mb-2">
                    Business Size (Annual Revenue) <span className="text-low">*</span>
                  </label>
                  <select
                    id="businessSize"
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-border-light bg-bg-primary text-text-primary focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239B8F83'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.5rem',
                    }}
                  >
                    {BUSINESS_SIZES.map(size => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hidden UTM Fields */}
                <input type="hidden" name="utm_source" value={formData.utm_source} />
                <input type="hidden" name="utm_medium" value={formData.utm_medium} />
                <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
                <input type="hidden" name="utm_ad_set" value={formData.utm_ad_set} />
                <input type="hidden" name="utm_term" value={formData.utm_term} />
                <input type="hidden" name="utm_content" value={formData.utm_content} />

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-low/10 rounded-lg border border-low/30">
                    <AlertCircle className="w-5 h-5 text-low flex-shrink-0" />
                    <p className="text-sm text-low">{errorMessage || "Something went wrong. Please try again."}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-dark disabled:bg-text-tertiary text-bg-primary px-6 py-4 rounded-lg font-medium transition-all hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Request Demo"
                  )}
                </button>

                <p className="text-xs text-text-tertiary text-center">
                  By submitting this form, you agree to receive communications from Thorbit.
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-light py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} Thorbit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
