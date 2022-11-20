#!/bin/bash

# script to check if the build on VERCEL is necessary
# https://vercel.com/support/articles/how-do-i-use-the-ignored-build-step-field-on-vercel
# for available environment vars in VERCEL,
# https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables

# this runs when Ignored Build Step is set to ./check-build.sh
# https://vercel.com/docs/concepts/projects/overview#ignored-build-step


# echo for debugging
echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if [[ ! "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[skip-build]" ]] ; then
  # Proceed with the build
	echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi