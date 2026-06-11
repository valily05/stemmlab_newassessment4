import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface Props{
feedback:string;
}

export default function TeacherFeedbackCard({
feedback,
}:Props){

return(

<View style={styles.card}>

<Text style={styles.title}>
TEACHER FEEDBACK
</Text>

<Text style={styles.feedback}>
{feedback}
</Text>

</View>

);

}

const styles=StyleSheet.create({

card:{
margin:20,
padding:20,
backgroundColor:"#17133F",
borderRadius:20,
borderWidth:2,
borderColor:"#4B53A3",
},

title:{
color:"#FFE95B",
fontFamily:"Pixel",
fontSize:18,
marginBottom:12,
},

feedback:{
color:"#FFF",
fontFamily:"PixelOperator",
fontSize:16,
lineHeight:24,
},

});