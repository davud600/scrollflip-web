import { useState } from 'react'
import { Modal, View, Text, StyleSheet, Pressable, Linking } from 'react-native'
import { IS_ON_DESKTOP } from '../../utils/settings'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/Feather'
import Facebook from 'react-native-vector-icons/Entypo'

import Close from 'react-native-vector-icons/Fontisto'

type ShareButtonProps = {
  articleLink: string
}

export default function ShareButton({ articleLink }: ShareButtonProps) {
  const [copiedText, setCopiedText] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const closeModal = () => {
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <View
      style={[
        tw`flex items-end justify-end`,
        {
          backgroundColor: 'transparent',
        },
      ]}
    >
      <View
        style={{
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        <Pressable
          style={[
            tw`px-4 py-4 mx-5 my-5 bg-gray-200`,
            {
              borderRadius: 500,
            },
          ]}
          onPress={openModal}
        >
          <Icon
            name={'share'}
            size={30}
            color={'#000000'}
            style={[
              tw``,
              {
                backgroundColor: 'transparent',
              },
            ]}
          />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '500' }}>
                Share Article
              </Text>
              <Pressable onPress={closeModal}>
                <Close name={'close-a'} size={18} color={'#000000'} />
              </Pressable>
            </View>
            <View>
              <View>
                <input
                  disabled
                  style={styles.inputStyle}
                  type="text"
                  value={articleLink}
                />
              </View>
              <View style={styles.parentCopyView}>
                <View style={styles.copyButton}>
                  <Pressable
                    style={{
                      backgroundColor: '#008038',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      void navigator.clipboard.writeText(articleLink)
                      setCopiedText(true)
                    }}
                  >
                    <Text style={styles.copyButtonText}>
                      {copiedText ? 'Copied' : 'Copy Link'}
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    Linking.openURL(
                      `https://www.facebook.com/sharer/sharer.php?u=https%3A//${articleLink}`
                    )
                  }}
                  style={styles.iconButton}
                >
                  <Facebook
                    name={'facebook'}
                    size={30}
                    color={'black'}
                    style={[
                      tw``,
                      {
                        backgroundColor: 'transparent',
                      },
                    ]}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    Linking.openURL(
                      `https://twitter.com/intent/tweet?text=https%3A//${articleLink}`
                    )
                  }}
                  style={styles.iconButton}
                >
                  <Icon
                    name={'twitter'}
                    size={30}
                    color={'#000000'}
                    style={[
                      tw``,
                      {
                        backgroundColor: 'transparent',
                      },
                    ]}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    width: IS_ON_DESKTOP ? '30%' : '80%',
    height: IS_ON_DESKTOP ? '20%' : '30%',
    padding: 20,
    elevation: 10,
  },
  modalText: {
    lineHeight: 30,
    flex: 1,
    justifyContent: 'flex-start',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#144270',
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLinkText: {
    textDecorationLine: 'underline',
    fontSize: 17,
    lineHeight: 25,
    color: '#144270',
  },
  copyButton: {
    marginTop: 20,
    borderRadius: 5,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  inputStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  parentCopyView: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 25,
  },
  iconButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 5,
  },
})
