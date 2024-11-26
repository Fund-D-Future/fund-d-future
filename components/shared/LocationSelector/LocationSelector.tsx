"use client"
import { Box, Flex, Select, Text } from "@radix-ui/themes"
import { Country, State, City, IState, ICity } from "country-state-city"
import { useEffect, useState } from "react"

type LocationSelectorProps = {
  direction?: "column" | "row"
}

const COUNTRIES = Country.getAllCountries()

export default function LocationSelector({ direction = "row" }: LocationSelectorProps) {
  const [location, setLocation] = useState({ country: "", state: "", city: "" })
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])

  // Reset dependent fields when country changes
  useEffect(() => {
    if (location.country) {
      setStates(State.getStatesOfCountry(location.country))
      setLocation({ ...location, state: "", city: "" })
      setCities([])
    }
  }, [location.country])

  // Reset city when state changes
  useEffect(() => {
    if (location.state) {
      setCities(City.getCitiesOfState(location.country, location.state))
      setLocation({ ...location, city: "" })
    }
  }, [location.state])

  return (
    <Flex direction={direction} gap="4" flexGrow="1">
      {/* Country */}
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium" as="p">
          Country
        </Text>
        <Select.Root
          onValueChange={(value) => setLocation({ ...location, country: value })}
          value={location.country}
          required
          size="3"
        >
          <Select.Trigger
            placeholder="Select Country of residence"
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingBlock: "0.5rem",
              paddingInline: "0.75rem",
              display: "flex",
            }}
            color="green"
          />
          <Select.Content position="popper" style={{ maxHeight: "200px" }}>
            <Select.Group>
              {COUNTRIES.map((country) => (
                <Select.Item key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
      {/* State */}
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium" as="p">
          State
        </Text>
        <Select.Root
          onValueChange={(value) => setLocation({ ...location, state: value })}
          value={location.state}
          required
          disabled={!location.country}
          size="3"
        >
          <Select.Trigger
            placeholder="Select State"
            style={{
              backgroundColor: "white",
              width: "100%",
              display: "flex",
            }}
            color="green"
          />
          <Select.Content position="popper" style={{ maxHeight: "200px" }}>
            <Select.Group>
              {states.map((state) => (
                <Select.Item key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
      {/* City */}
      <Box className="flex-1 space-y-2">
        <Text size="3" weight="medium" as="p">
          City
        </Text>
        <Select.Root
          onValueChange={(value) => setLocation({ ...location, city: value })}
          value={location.city}
          required
          disabled={!location.state}
          size="3"
        >
          <Select.Trigger
            placeholder="Select City"
            style={{
              backgroundColor: "white",
              width: "100%",
              paddingBlock: "0.5rem",
              paddingInline: "0.75rem",
              display: "flex",
            }}
            color="green"
          />
          <Select.Content position="popper" style={{ maxHeight: "200px" }}>
            <Select.Group>
              {cities.map((city) => (
                <Select.Item key={city.name} value={city.name}>
                  {city.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
    </Flex>
  )
}
