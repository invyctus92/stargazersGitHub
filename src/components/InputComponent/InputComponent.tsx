/**
 * Generic input field
 *
 * @format
 */

 import React, { type PropsWithChildren } from "react";
 import { StyleSheet, TextInput } from "react-native";
 
 const InputComponent: React.FC<
   PropsWithChildren<{
     placeholder?: string;
     value: string;
     onChangeText: (value: string) => void;
   }>
 > = ({ placeholder = "", value = "ciao", onChangeText = () => {} }) => {
   return (
     <TextInput
       placeholder={placeholder}
       value={value}
       onChangeText={(value) => {
         onChangeText(value);
       }}
       style={styles.inputContainer}
     />
   );
 };
 
 const styles = StyleSheet.create({
   inputContainer: {
     width: "80%",
     backgroundColor: "#ffffff",
     borderRadius: 15,
     borderWidth: 1,
     borderColor: "#3d3d3d",
     padding: 10,
   },
 });
 
 export default InputComponent;
 