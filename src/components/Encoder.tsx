'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Lock } from 'lucide-react';
import { encodeName } from './ui/utils';
import { usePathname } from 'next/navigation';

export const Encoder: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const handleEncode = () => {
    if (!inputText.trim()) {
      setEncodedText('');
      setFullUrl('');
      return;
    }

    const encoded = encodeName(inputText.trim());
    setEncodedText(encoded);
    
    // Generate full URL
    const url = `${baseUrl}?receiver=${encoded}`;
    setFullUrl(url);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl rounded-3xl p-8 w-full max-w-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Lock className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Name Encoder</h1>
            <p className="text-sm text-gray-500">Encode names for personalized Valentine URLs</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Name
            </label>
            <div className="flex gap-2">
              <input
                id="name-input"
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value.trim() && baseUrl) {
                    const encoded = encodeName(e.target.value.trim());
                    setEncodedText(encoded);
                    setFullUrl(`${baseUrl}?receiver=${encoded}`);
                  } else {
                    setEncodedText('');
                    setFullUrl('');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEncode();
                  }
                }}
                placeholder="e.g., Caron"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEncode}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                Encode
              </motion.button>
            </div>
          </div>

          {encodedText && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encoded Text
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={encodedText}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(encodedText)}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fullUrl}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs break-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(fullUrl)}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-sm text-gray-700">
                  <strong>Preview:</strong> When someone visits this URL, they'll see:
                </p>
                <p className="text-lg font-semibold text-pink-600 mt-2">
                  "{inputText.trim()}, will you be my Valentine?" 💖
                </p>
              </div>
            </motion.div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This is a hidden route for generating encoded URLs. Share the generated URL with your Valentine! 💕
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
