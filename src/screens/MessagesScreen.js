import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadows } from '../constants/theme';
import { DEMO } from '../constants/data';

// ─── INITIAL MESSAGES ──────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    from: 'installer',
    text: "Hi Sarah, I'm James — your installer for Thursday. I've reviewed the site photos and everything looks good. See you at 8am!",
    time: '10:32 AM',
  },
  {
    from: 'customer',
    text: 'Great, thanks James! The switchboard is just inside the garage on the left.',
    time: '10:45 AM',
  },
  {
    from: 'installer',
    text: "Perfect, that'll make things easier. I'll have everything wrapped up by midday",
    time: '10:48 AM',
  },
];

const QUICK_REPLIES = [
  'Thanks!',
  'What time will you arrive?',
  'Can I call you?',
  'See you then!',
];

// ─── MESSAGE BUBBLE ────────────────────────────────────────
function MessageBubble({ message }) {
  const isCustomer = message.from === 'customer';
  const isSystem = message.from === 'system';

  if (isSystem) {
    return (
      <View style={styles.systemMsgContainer}>
        <View style={styles.systemMsgBubble}>
          <Text style={styles.systemMsgText}>{message.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[
      styles.bubbleRow,
      isCustomer ? styles.bubbleRowRight : styles.bubbleRowLeft,
    ]}>
      <View style={[
        styles.bubble,
        isCustomer ? styles.bubbleCustomer : styles.bubbleInstaller,
      ]}>
        <Text style={[
          styles.bubbleText,
          isCustomer && styles.bubbleTextCustomer,
        ]}>{message.text}</Text>
        <Text style={[
          styles.bubbleTime,
          isCustomer && styles.bubbleTimeCustomer,
        ]}>{message.time}</Text>
      </View>
    </View>
  );
}

// ─── MAIN MESSAGES SCREEN ──────────────────────────────────
export default function MessagesScreen({ navigation }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const timeStr = `${hours % 12 || 12}:${mins} ${ampm}`;

    setMessages(prev => [...prev, {
      from: 'customer',
      text: text.trim(),
      time: timeStr,
    }]);
    setInputText('');
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with installer info */}
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerInitials}>{DEMO.installer.initials}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{DEMO.installer.name}</Text>
          <Text style={styles.headerRole}>Your Installer</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Messages list */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {/* System notice */}
          <MessageBubble message={{
            from: 'system',
            text: 'Messages are logged for your security. Phone numbers are kept private.',
          }} />

          {/* Quick replies */}
          <View style={styles.quickReplies}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickRepliesInner}>
              {QUICK_REPLIES.map((reply, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.quickReplyChip}
                  activeOpacity={0.7}
                  onPress={() => handleQuickReply(reply)}
                >
                  <Text style={styles.quickReplyText}>{reply}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textMuted}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(inputText)}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            activeOpacity={0.7}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── STYLES ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.lg,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: '#1A3D2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInitials: {
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  headerInfo: {},
  headerName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  headerRole: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.accent,
  },

  // Keyboard avoid
  keyboardAvoid: { flex: 1 },

  // Messages list
  messagesList: { flex: 1 },
  messagesContent: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },

  // Bubble rows
  bubbleRow: {
    marginBottom: Spacing.xs,
  },
  bubbleRowRight: {
    alignItems: 'flex-end',
  },
  bubbleRowLeft: {
    alignItems: 'flex-start',
  },

  // Bubbles
  bubble: {
    maxWidth: '78%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 18,
  },
  bubbleCustomer: {
    backgroundColor: Colors.accent,
    borderBottomRightRadius: 4,
  },
  bubbleInstaller: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  bubbleText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 21,
  },
  bubbleTextCustomer: {
    color: Colors.white,
  },
  bubbleTime: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'right',
    marginTop: 6,
  },
  bubbleTimeCustomer: {
    color: 'rgba(255,255,255,0.6)',
  },

  // System message
  systemMsgContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  systemMsgBubble: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    backgroundColor: Colors.bg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  systemMsgText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  // Quick replies
  quickReplies: {
    marginTop: Spacing.md,
  },
  quickRepliesInner: {
    gap: Spacing.sm,
  },
  quickReplyChip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.accentSoft,
  },
  quickReplyText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.accent,
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bg,
    fontSize: FontSize.lg,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  sendArrow: {
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});
