import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 4,
    },
    card: {
        margin: 4,
    },
    screenContainer: {
        flex: 1,
    }
});

export const cardstyles = StyleSheet.create({
    card: {
        margin: 4,
    },
});

export const detailstyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 8,
    },
    contentContainer: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    authorIcon: {
        marginRight: 8,
    },
    buyButton: {
        marginTop: 'auto',
        margin: 16,
    }
});