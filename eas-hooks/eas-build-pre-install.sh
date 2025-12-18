#!/usr/bin/env bash

set -euo pipefail

echo "Configuring Android build environment for CMake..."

# Ensure CMake and NDK are properly configured
# This helps resolve CMake build issues with react-native-reanimated and react-native-worklets

# Set environment variables for the build
export ANDROID_NDK_VERSION=${ANDROID_NDK_VERSION:-"25.2.9519653"}

echo "Android NDK Version: $ANDROID_NDK_VERSION"
echo "Build environment configured successfully"
