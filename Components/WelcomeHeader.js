import * as  React from "react" ;
import{Header} from "react-native-elements";

const WelcomeHeader=(props)=>{
    return(
        <Header 
            backgroundColor="gold"
            centerComponent={{text:"Book Santa", style:{color:"black",fontSize:30,paddingVertical:20,fontWeight:"bold"}}}
        />
    )
} 
 export default WelcomeHeader;