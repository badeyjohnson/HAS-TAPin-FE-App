const ListRow = ({ title, description, navigation, parent }) => (
    <View style={styles.container}>
      <View style={styles.container_text}>
        <Text
          style={styles.title}
          onPress={() => 
            navigation.navigate(parent === 'Home' ? 'Job' : 'SSRA', title)
          }
        >
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>