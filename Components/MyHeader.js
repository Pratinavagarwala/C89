import * as  React from "react" ;
import{Header} from "react-native-elements";

const MyHeader=(props)=>{
    return(
        <Header 
            backgroundColor="grey"
            centerComponent={{text:"Book Santa", style:{color:"white",fontSize:30,paddingVertical:20,fontWeight:"bold"}}}
        />
    )
} 
 export default MyHeader;