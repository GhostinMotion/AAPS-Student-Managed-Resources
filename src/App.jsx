import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FileText,
  Layout,
  Image,
  GraduationCap,
  Download,
  ExternalLink,
  Phone,
  MessageCircle,
  FolderOpen,
  ChevronDown,
} from "lucide-react";
import { resourceCategories, siteContent } from "./data";

// Icon mapping for dynamic rendering
const iconMap = {
  FileText,
  Layout,
  Image,
  GraduationCap,
};

// File type icon mapping
const fileTypeIcons = {
  pdf: "📄",
  docx: "📝",
  xlsx: "📊",
  pptx: "📽️",
  zip: "📦",
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const { header, hero, contactSection, footer, siteName } = siteContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Sticky Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {siteName}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {header.navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg ${
                    link.active
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150 active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                className="md:hidden overflow-hidden border-t border-gray-100"
              >
                <div className="py-2 space-y-1">
                  {header.navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className={`block px-4 py-2 rounded-lg ${
                        link.active
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {hero.title}
          </h1>
          <p className="text-lg text-gray-600">{hero.description}</p>
        </motion.div>

        {/* Resource Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {resourceCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon];
            const isExpanded = expandedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                <div className="bg-white rounded-2xl shadow-lg shadow-black/5 border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Category Header */}
                  <div className="p-6">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {category.fileCount} files available
                    </p>

                    {/* Preview Files */}
                    <div className="space-y-2 mb-4">
                      {category.files.slice(0, 2).map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="mr-2">
                            {fileTypeIcons[file.type]}
                          </span>
                          <span className="truncate flex-1">{file.name}</span>
                        </div>
                      ))}
                      {!isExpanded && category.files.length > 2 && (
                        <p className="text-sm text-gray-400 italic">
                          + {category.files.length - 2} more files
                        </p>
                      )}
                    </div>

                    {/* View All Button */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-150 active:scale-[0.97] flex items-center justify-center space-x-2"
                    >
                      <span>{isExpanded ? "Show Less" : "View All"}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>
                  </div>

                  {/* Expanded File List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        className="border-t border-gray-100 bg-gray-50 overflow-hidden"
                      >
                        <div className="p-6 space-y-3">
                          {category.files.map((file, fileIndex) => (
                            <motion.div
                              key={file.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fileIndex * 0.05 }}
                              className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-150 group"
                            >
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <span className="text-2xl flex-shrink-0">
                                  {fileTypeIcons[file.type]}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {file.size}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={file.url}
                                download
                                className="ml-2 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 active:scale-95 flex-shrink-0"
                                aria-label={`Download ${file.name}`}
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.6,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-600/20 p-6 sm:p-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {contactSection.title}
          </h2>
          <p className="text-blue-100 mb-6">{contactSection.subtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* WhatsApp */}
            <motion.a
              href={contactSection.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-white/20"
            >
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{contactSection.whatsappText}</p>
                <p className="text-sm text-blue-100 flex items-center">
                  Join our community <ExternalLink className="w-3 h-3 ml-1" />
                </p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${contactSection.phoneNumber}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-white/20"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{contactSection.phoneText}</p>
                <p className="text-sm text-blue-100">
                  {contactSection.phoneNumber}
                </p>
              </div>
            </motion.a>

            {/* Google Drive */}
            <motion.a
              href={contactSection.googleDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-xl transition-all duration-200 flex items-center space-x-3 border border-white/20"
            >
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{contactSection.driveText}</p>
                <p className="text-sm text-blue-100 flex items-center">
                  Browse all files <ExternalLink className="w-3 h-3 ml-1" />
                </p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>{footer.copyright}</p>
            <p className="mt-2">{footer.footerTagline}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
