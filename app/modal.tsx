import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import '../i18n';

export default function ModalScreen() {
  const { t, i18n } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      
      <Text style={{ fontSize: 24, marginBottom: 20, color: 'black' }}>
        {t("title")}
      </Text>

      <Text style={{ color: 'black' }}>
        {t("start")}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Button title="English" onPress={() => i18n.changeLanguage("en")} />
        <Button title="Bahasa" onPress={() => i18n.changeLanguage("id")} />
      </View>

    </View>
  );
}