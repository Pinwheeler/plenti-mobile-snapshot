import Slider from "@react-native-community/slider"
import { Text } from "@rneui/themed"
import { useFormikContext } from "formik"
import React, { useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData, View } from "react-native"
import { H3 } from "../../components/typography/H3"
import Theme from "../../lib/Theme"

const FORIMIK_KEY = "maxDistance"

interface Props {
  prefersMetric: boolean
  onChange: (value: number) => void
}

const MAX_VALUE = 101
const MIN_VALUE = 5

export const MaxDistanceAdjustor: React.FC<Props> = (props) => {
  const { values, setFieldValue, errors } = useFormikContext<{
    maxDistance: number
  }>()
  const { prefersMetric, onChange } = props
  const [textPreview, setTextPreview] = useState<string>()
  const [isEditingText, setEditingText] = useState(false)
  const distance = values.maxDistance
  const sliderValue = () => {
    if (distance < 0) {
      return MAX_VALUE
    } else {
      return distance
    }
  }

  const handleChange = (value: number) => {
    setFieldValue(FORIMIK_KEY, value)
    onChange(value)
  }

  const handleSliderChanged = (value: number) => {
    setEditingText(false)
    if (value < MAX_VALUE) {
      handleChange(Math.round(value))
    } else {
      handleChange(-1)
    }
  }

  const handleSliderChanging = (value: number) => {
    setEditingText(true)
    setTextPreview(Math.round(value).toString())
  }

  const handleTextEditSubmit = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    let value = parseInt(event.nativeEvent.text)
    if (value > MAX_VALUE) {
      value = MAX_VALUE
    }
    if (value < MIN_VALUE) {
      value = MIN_VALUE
    }
    setEditingText(false)
    setTextPreview(undefined)
    handleSliderChanged(value)
  }

  const handleTextValueChanged = (value: string) => {
    setEditingText(true)
    setTextPreview(value)
  }

  const textValue = () => {
    if (isEditingText) {
      return textPreview
    } else {
      return sliderValue() < MAX_VALUE ? sliderValue().toString() : undefined
    }
  }

  return (
    <View style={{ marginBottom: 15 }}>
      <H3 style={{ marginBottom: 10 }}>Maximum Distance</H3>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <Text style={{ paddingTop: 14 }}>Adjust: </Text>
        <Slider
          style={{ width: "55%" }}
          minimumValue={MIN_VALUE}
          maximumValue={MAX_VALUE}
          value={sliderValue()}
          minimumTrackTintColor={Theme.colors.accent}
          thumbTintColor={Theme.colors.accent}
          onSlidingComplete={handleSliderChanged}
          onValueChange={handleSliderChanging}
        />
        <TextInput
          style={{
            marginLeft: 10,
            marginRight: 10,
            width: "12%",
            color: Theme.colors.onSurface,
          }}
          placeholder="Max"
          value={textValue()}
          keyboardType="number-pad"
          onSubmitEditing={handleTextEditSubmit}
          onChangeText={handleTextValueChanged}
          placeholderTextColor={Theme.colors.disabled}
        />
        <Text style={{ paddingTop: 14, width: "8%" }}>{prefersMetric ? "km" : "mi"}</Text>
      </View>
    </View>
  )
}
