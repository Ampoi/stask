import { initializeApp } from "firebase-admin/app"

import { checkMember } from "./function/checkMember.js"
import { getInviteGroupData } from "./function/getInviteGroupData.js"
import { joinInviteGroup } from "./function/joinInviteGroup.js"
import { createOnChangeMessage } from "./function/createOnChangeMessage.js"

initializeApp()

const sendMesssage = createOnChangeMessage()

export { checkMember, getInviteGroupData, joinInviteGroup, sendMesssage }