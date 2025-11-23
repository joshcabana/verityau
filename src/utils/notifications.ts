import { supabase } from "@/integrations/supabase/client";

interface CreateNotificationParams {
  userId: string;
  type: "match" | "verity_date_request" | "verity_date_accepted" | "message";
  title: string;
  message: string;
  relatedId?: string;
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  relatedId,
}: CreateNotificationParams) {
  try {
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      type,
      title,
      message,
      related_id: relatedId,
    });

    if (error) {
      console.error("Error creating notification:", error);
      return;
    }

    // Send push notification for message types
    if (type === "message") {
      try {
        await supabase.functions.invoke("send-push-notification", {
          body: {
            recipientId: userId,
            title,
            body: message,
            url: `/matches?chat=${relatedId}`,
            matchId: relatedId,
          },
        });
      } catch (pushError) {
        console.error("Error sending push notification:", pushError);
      }
    }
  } catch (error) {
    console.error("Error in createNotification:", error);
  }
}
