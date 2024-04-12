"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'

type InputFormProps = {
  isReadyToSubmit: boolean, 
  setIsReadyToSubmit: React.Dispatch<React.SetStateAction<boolean>>, 
  setArgs: React.Dispatch<React.SetStateAction<[string, string, string, string]>>
}

export default function InputForm({isReadyToSubmit, setIsReadyToSubmit, setArgs}: InputFormProps) {

  console.log("InputForm rendered");
    
    const [uniName, setUniName] = useState<string>("");
    const [uniAddress, setUniAddress] = useState<string>("");
    const [tokenName, setTokenName] = useState<string>("");
    const [tokenSymbol, setTokenSymbol] = useState<string>("");

    useEffect(() => {
      if (!uniName || !uniAddress || !tokenName || !tokenSymbol) {
        isReadyToSubmit && setIsReadyToSubmit(false);
        return;
      }
      !isReadyToSubmit && setIsReadyToSubmit(true);
      setArgs([tokenName, tokenSymbol, uniName, uniAddress]);
    }, [isReadyToSubmit, setArgs, setIsReadyToSubmit, tokenName, tokenSymbol, uniName, uniAddress]);

    return (
          <form className="flex-col align-center justify-center p-5">
    
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3">
                  <label
                    className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="UniName"
                  >
                    Uni Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Input
                    type="text"
                    name="UniName"
                    onChange={(e) => setUniName(e.target.value)}
                    placeholder="LNMIIT"
                  />
                </div>
              </div>
    
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3">
                  <label 
                    className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                    htmlFor="UniAddress"
                  >
                    Uni Address
                  </label>
                </div>
                <div className="md:w-2/3" >
                  <Input
                    type="text"
                    name="UniAddress"
                    onChange={(e) => setUniAddress(e.target.value)}
                    placeholder="Rupa Ki Nangal, Post Sumel"
                  />
                </div>
              </div>
    
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3">
                  <label 
                    className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                    htmlFor="TokenName"
                  >
                    Token Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Input
                    type="text"
                    name="TokenName"
                    onChange={(e) => setTokenName(e.target.value)}
                    placeholder="LNM Student Token"
                  />
                </div>
              </div>
    
              <div className="md:flex md:items-center mb-4">
                <div className="md:w-1/3">
                  <label 
                    className="text-lg block text-gray-600 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                    htmlFor="TokenSymbol"
                  >
                    Token Symbol
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Input
                    type="text"
                    name="TokenSymbol"
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    placeholder="LNMST"
                  />
                </div>
              </div>

            </form>
      );
    };