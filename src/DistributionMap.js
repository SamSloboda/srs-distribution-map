import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import countriesSVG from "@/data/countries.svg?raw"; // using Vite or raw-loader

const countriesData = [
  {
    name: "Slovakia",
    code: "SK",
    capital: "Bratislava",
    population: "5.4 million",
    gdp: "$121 billion",
    currency: "Euro (EUR)",
    divisions: {
      lighting: {
        contact: "Samuel Sloboda",
        email: "samuel@srs-group.com",
        picture: "/images/samuel.jpg",
        performance: "High",
      },
      rigging: {
        contact: "Juraj Nádašský",
        email: "juraj@srs-group.com",
        picture: "/images/juraj.jpg",
        performance: "Medium",
      },
      power: {
        contact: "Karol Horvat",
        email: "karol@srs-group.com",
        picture: "/images/karol.jpg",
        performance: "High",
      },
    },
    installationPartner: {
      name: "TechInstall Slovakia",
      contact: "Peter Kováč",
      picture: "/images/peter.jpg",
      performance: "Certified Partner",
    },
  },
  {
    name: "France",
    code: "FR",
    capital: "Paris",
    population: "67 million",
    gdp: "$3.1 trillion",
    currency: "Euro (EUR)",
    divisions: {},
    installationPartner: null,
  },
];

export default function DistributionMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showGeneralInfo, setShowGeneralInfo] = useState(true);

  useEffect(() => {
    countriesData.forEach(({ code, divisions }) => {
      const el = document.getElementById(code);
      if (!el) return;

      if (divisions.lighting && divisions.rigging && divisions.power) {
        el.setAttribute("fill", "#666"); // TODO: Use defs and pattern for true split
      } else if (divisions.lighting) {
        el.setAttribute("fill", "orange");
      } else if (divisions.rigging) {
        el.setAttribute("fill", "blue");
      } else if (divisions.power) {
        el.setAttribute("fill", "magenta");
      } else {
        el.setAttribute("fill", "#ccc");
      }
    });
  }, []);

  const handleCountryClick = (e) => {
    const id = e.target.id;
    if (!id || id.length !== 2) return;
    const country = countriesData.find((c) => c.code === id);
    setSelectedCountry(country || null);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-screen">
      <div
        className="h-full overflow-hidden [&>svg]:w-full [&>svg]:h-full cursor-pointer"
        onClick={handleCountryClick}
        dangerouslySetInnerHTML={{ __html: countriesSVG }}
      />

      <div className="overflow-y-auto">
        {selectedCountry && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{selectedCountry.name}</h2>
                <Toggle onClick={() => setShowGeneralInfo(!showGeneralInfo)}>
                  General Info
                </Toggle>
              </div>
              {showGeneralInfo && (
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Capital:</strong> {selectedCountry.capital}
                  </p>
                  <p>
                    <strong>Population:</strong> {selectedCountry.population}
                  </p>
                  <p>
                    <strong>GDP:</strong> {selectedCountry.gdp}
                  </p>
                  <p>
                    <strong>Currency:</strong> {selectedCountry.currency}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {selectedCountry && (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(selectedCountry.divisions).map(([division, info]) => (
              <Card key={division}>
                <CardContent className="p-4">
                  <h3 className="font-semibold capitalize">SRS {division.toUpperCase()}</h3>
                  <img src={info.picture} alt={info.contact} className="rounded-full w-12 h-12 my-2" />
                  <p>{info.contact}</p>
                  <p className="text-sm text-muted-foreground">{info.email}</p>
                  <p className="text-sm mt-2">Performance: {info.performance}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedCountry?.installationPartner && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-semibold">Installation Partner</h3>
              <img
                src={selectedCountry.installationPartner.picture}
                alt={selectedCountry.installationPartner.contact}
                className="rounded-full w-12 h-12 my-2"
              />
              <p>{selectedCountry.installationPartner.contact}</p>
              <p className="text-sm mt-2">{selectedCountry.installationPartner.performance}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}